describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('a blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#new-title-input').type('Test title')
      cy.get('#new-author-input').type('Test author')
      cy.get('#new-url-input').type('test.url.org')
      cy.get('#create-button').click()
      cy.contains('Test title Test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title',
          author: 'Test author',
          url: 'test.url.org',
        })
      })

      it('the blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('its creator can delete it', function () {
        cy.contains('Test title Test author').contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Test title Test auhtor')
      })

      it('user different from creator cannot delete it', function () {
        const secondUser = {
          name: 'Second Test User',
          username: 'seconduser',
          password: 'secondpassword',
        }
        cy.request('POST', 'http://localhost:3003/api/users', secondUser)
        cy.login({ username: 'seconduser', password: 'secondpassword' })

        cy.contains('Test title Test author').contains('view').click()
        cy.contains('remove').click()

        cy.contains('Removing not authorized')
        cy.contains('Test title Test author')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlogWithLikes({
          title: 'First title',
          author: 'Test author',
          url: 'test.url.org',
          likes: 5,
        })
        cy.createBlogWithLikes({
          title: 'Second title',
          author: 'Test author',
          url: 'test.url.org',
          likes: 1,
        })
        cy.createBlogWithLikes({
          title: 'Third title',
          author: 'Test author',
          url: 'test.url.org',
          likes: 3,
        })
        cy.createBlogWithLikes({
          title: 'Fourth title',
          author: 'Test author',
          url: 'test.url.org',
          likes: 7,
        })
      })

      it('they are ordered by likes in decreasing order', function () {
        cy.get('.blog').eq(0).should('contain', 'Fourth title')
        cy.get('.blog').eq(1).should('contain', 'First title')
        cy.get('.blog').eq(2).should('contain', 'Third title')
        cy.get('.blog').eq(3).should('contain', 'Second title')
      })

      it.only('adding likes reorders the blogs correctly', function () {
        cy.get('.blog').eq(1).contains('view').click()
        cy.wait(200)
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(200)
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(200)
        cy.get('.blog').eq(0).should('contain', 'First title')
      })
    })
  })
})
