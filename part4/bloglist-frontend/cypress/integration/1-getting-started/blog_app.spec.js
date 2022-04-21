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
})
