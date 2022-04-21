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

  describe('Blog app', function () {
    // ...

    describe('When logged in', function () {
      beforeEach(function () {
        const user = { name: 'abdi', username: 'abdi123', password: 'Test123' }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.contains('login').click()
        cy.get('#username').type('abdi123')
        cy.get('#password').type('Test123')
        cy.get('#submit-login').click()
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('www.test.com')
        cy.get('#submit-blog').click()
        cy.get('.confirm').should(
          'contain',
          'test title by test author is added!'
        )
        cy.get('.blogs-list').should('contain', 'test title')
        cy.get('.confirm').should('have.css', 'color', 'rgb(0, 128, 0)') // full green is actually lime
      })
      it('A user can like a blog', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('www.test.com')
        cy.get('#submit-blog').click()
        cy.get('#view-hide-button').click()
        cy.get('#like-button').click()
        cy.get('#likes').should('contain', '1')
      })
    })
  })
})
