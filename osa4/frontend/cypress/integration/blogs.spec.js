describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'cypressHill',
      name: 'Cika',
      password: 'sekreto'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('button').contains('Login')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.login({ username: 'cypressHill', password: 'sekreto' })
      cy.contains('Cika is logged in')
      cy.get('button').contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypressHill234')
      cy.get('#password').type('sekreto234')
      cy.get('button').contains('Login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'cypressHill', password: 'sekreto' })
    })

    it('A blog can be created', function() {
      cy.contains('blogs')
      cy.get('button').contains('create a new blog').click()

      cy.get('#title').type('CypressTitle')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('Cypress.com')
      cy.get('#submitBlog').click()

      cy.contains('added')
      cy.get('button').contains('create a new blog')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'CypressTitle', author: 'Cypress', url: 'Cypress.com' })

      cy.contains('view').click()
      cy.get('#blogLikes').should('contain', '0')
      cy.contains('like').click()
      cy.get('#blogLikes').should('contain', '1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({ title: 'CypressTitle', author: 'Cypress', url: 'Cypress.com' })

      cy.contains('view').click()
      cy.contains('delete').click()

      cy.should('not.contain', '#blogDiv')
    })

    it('A blog cant be deleted by another user', function() {
      cy.createUser({ username: 'dummy', name: 'Dummytester', password: 'sekreto' })
      cy.login({ username: 'dummy', password: 'sekreto' })
      cy.createBlog({ title: 'DummyTitle', author: 'Dummydummy', url: 'DumbAndDumber.com' })
      cy.contains('logout').click()

      cy.login({ username: 'cypressHill', password: 'sekreto' })
      cy.contains('view').click()
      cy.should('not.contain', cy.contains('delete') )
    })

    it('Blogs are sorted by likes', function() {
      cy.createBlog({ title: 'DummyTitle1', author: 'Dummydummy', url: 'DumbAndDumber.com' })
      cy.createBlog({ title: 'DummyTitle2', author: 'Dummydummy', url: 'DumbAndDumber.com' })
      cy.createBlog({ title: 'DummyTitle3', author: 'Dummydummy', url: 'DumbAndDumber.com' })

      cy.get('.blogDivItem').contains('DummyTitle2').as('blog2')
        .then( (blog) => {
          cy.likeBlog(blog[0], 2)
        })

      cy.get('.blogDivItem').contains('DummyTitle3').as('blog3')
        .then( (blog) => {
          cy.likeBlog(blog[0], 3)
        })

      cy.get('#blogDiv .blogDivItem:first').should('contain', 'DummyTitle3')
      cy.get('#blogDiv .blogDivItem:nth-child(2)').should('contain', 'DummyTitle2')
      cy.get('#blogDiv .blogDivItem:last').should('contain', 'DummyTitle1')
    })
  })
})