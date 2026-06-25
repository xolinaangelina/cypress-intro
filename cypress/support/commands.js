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
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/', {
    auth: {
      username: Cypress.env('guestLogin'),
      password: Cypress.env('guestPassword')
    }
  });
  cy.get('.header_signin').click();
  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password, { sensitive: true });
  cy.get('button[type="button"]').contains('Login').click();
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});
Cypress.Commands.add('createExpenseViaApi', (carId, mileage, liters, totalCost) => {
  cy.getCookies().then((cookies) => {
    const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
    cy.request({
      method: 'POST',
      url: '/api/expenses',
      headers: { Cookie: cookieString },
      body: {
        carId,
        reportedAt: new Date().toISOString().split('T')[0],
        mileage,
        liters,
        totalCost,
      },
    }).then((response) => {
      cy.wrap(response).as('expenseResponse');
    });
  });
});