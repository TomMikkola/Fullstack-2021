const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/books')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = 'mongodb+srv://admin:st0r3MySh1t@cluster0.mpakd.mongodb.net/library-app?retryWrites=true&w=majority'
console.log('connecting to db')

const SECRET = 'asd'

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
}).then( () => {
  console.log('connected to db successfully')
}).catch( (error) => {
  console.log('error connecting to db: ', error.message)
})

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ):Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre){
        return await Book.find({}).populate('author')

      } else if( args.author && !args.genre){
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: {$in: [author._id]} })

      } else if( !args.author && args.genre ){
        return(
          args.genre === ''
            ? await Book.find({}).populate('author')
            : await Book.find({ genres: {$in: [args.genre]} }).populate('author')
        )
      }
      
      const author = await Author.findOne({ name: args.author })
      return Book.find({ author: {$in: [author._id]}, genres: {$in: [args.genre]} })
    },
    allAuthors: async (root, args, context, info) => {
      //console.log(info)
      let authors = await Author.find({})
      
      return authors.map( async author => {
        const count = (await Book.find({ author: { $in: [author._id] } })).length

        return{
          name: author.name,
          born: author.born,
          bookCount: count
        }
      })
    },
    me: (root, args, context) => {
      return context.loggedUser
    }
  },

  Mutation: {
    createUser: (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try{
        newUser.save()
      } catch(error){
        throw new UserInputError('invalid username',{ 
        invalidArgs: args})
      }
      
    },
    
    login: async (root, args) => {

      const loggingUser = await User.findOne({ username: args.username })

      if(!loggingUser || args.password !== 'qwerty'){
        throw new UserInputError('wrong username or password') 
      }

      const loggedUser = {
        username: args.username,
        id: loggingUser._id
      }

      return { value: jwt.sign(loggedUser, SECRET) }
    },

    addBook: async (root, args, {loggedUser}) => {
      if(!loggedUser){
        throw new AuthenticationError('not logged in')
      }

      const unknownAuthor = await Author.findOne({ name: args.author })

      if(!unknownAuthor){
        const newAuthor = new Author({ 
          name: args.author,
          born: null
        })
        
        try{
          const savedAuthor = await newAuthor.save()
          const newBook = new Book({ ...args, author: {_id: savedAuthor._id} })
          await newBook.save()

          const dataToReturn = {
            title: newBook.title,
            published: newBook.published,
            author: savedAuthor,
            genres: newBook.genres
          }

          pubsub.publish('BOOK_ADDED', { bookAdded: dataToReturn })

          return dataToReturn
        } catch(error) {
          throw new UserInputError('Author name must be at least 4 characters long', {
            invalidArgs: args
          })
        }
      }

      try{
        const newBook = new Book({ ...args, author: {_id: unknownAuthor._id} })
        await newBook.save()
        
        const dataToReturn = {
          title: newBook.title,
          published: newBook.published,
          author: unknownAuthor,
          genres: newBook.genres
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: dataToReturn })

        return dataToReturn
      } catch(error) {
        throw new UserInputError('Book title must be at least 2 characters long', {
          invalidArgs: args
        })
      }
    },

    editAuthor: async (root, args, {loggedUser}) => {
      if(!loggedUser){
        throw new AuthenticationError('not logged in')
      }
      
      const authorToBeEdited = await Author.findOne({ name: args.name })

      if(!authorToBeEdited){
        return null
      }

      const bookCount = (await Book.find({ author: {$in: [authorToBeEdited._id]} })).length
      authorToBeEdited.born = args.setBornTo
        
      try{
        await authorToBeEdited.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return{
        name: authorToBeEdited.name,
        born: authorToBeEdited.born,
        bookCount
      }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req
      ? req.headers.authorization
      : null

    if(token && token.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify( token.substring(7), SECRET)
      const loggedUser = await User.findById(decodedToken.id)

      return {loggedUser}
    }
  }
})

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl }`)
})