/* eslint-disable linebreak-style */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/login',
    failOnStatusCode: false,
    body: { username: username, password: password }
  })
    .then( (response) => {
      localStorage.setItem('loggedUser', JSON.stringify(response.body) )
      cy.visit('http://localhost:3000')
    })

})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  const dummyUser = {
    username: username,
    name: name,
    password: password
  }

  cy.request('POST', 'http://localhost:3003/api/users', dummyUser)
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: ({ title, author, url }),
    headers: {
      'Authorization': `bearer ${JSON.parse( localStorage.getItem('loggedUser')).token }`
    }
  }).then( () => {
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('likeBlog', (blog, likes) => {
  cy.get(blog).find('button').contains('view').click()

  for(let i = 0; i < likes; i++){
    cy.get(blog).find('button').contains('like').click()
    cy.get(blog).find('#blogLikes').should('contain', i+1)
  }
})