describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login in to application')
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#submit-login')
    cy.get('#cancel')
  })
  describe('Login', function () {
    beforeEach(function () {
      const user = { name: 'abdi', username: 'abdi123', password: 'Test123' }
      cy.request('POST', 'http://localhost:3003/api/users', user)
    })
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('abdi123')
      cy.get('#password').type('Test123')
      cy.get('#submit-login').click()
      cy.contains('abdi has logged in')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('abdi123')
      cy.get('#password').type('WrongPassword123')
      cy.get('#submit-login').click()
      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
