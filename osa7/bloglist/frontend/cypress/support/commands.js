const STORAGE_KEY = 'bloggappUser'

Cypress.Commands.add('login', ({ username, password }) => {
  //cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
  cy.request('POST', `http://localhost:3000/api/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(body))
    cy.visit('http://localhost:3000/')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    //url:  `${Cypress.env('BACKEND')}/blogs`,
    url:  `http://localhost:3000/api/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem(STORAGE_KEY)).token}`
    }
  })

  cy.visit('http://localhost:3000/')
})
