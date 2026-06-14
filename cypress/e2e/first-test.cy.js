describe('My First Cypress Tests', () => {
  
  it('відкриває головну сторінку', () => {
    cy.visit('https://example.cypress.io')
    cy.title().should('include', 'Cypress')
  })

  it('перевіряє наявність заголовку на сторінці', () => {
    cy.visit('https://example.cypress.io')
    cy.get('h1').should('be.visible')
  })

  it('перевіряє що посилання Commands існує', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('Commands').should('be.visible')
  })

  it('переходить на сторінку Commands', () => {
  cy.visit('https://example.cypress.io')
  cy.contains('Commands').click()
  cy.url().should('include', 'example.cypress.io')
})

})