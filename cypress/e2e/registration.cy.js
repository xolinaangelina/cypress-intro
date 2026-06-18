describe('Registration form', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });
    cy.contains('Sign up').click();
  });

  // --- Name field ---
  it('should show error for empty Name field', () => {
    cy.get('#signupName').focus().blur();
    cy.get('#signupName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Name required');
  });

  it('should show error for invalid Name', () => {
    cy.get('#signupName').type('1234').blur();
    cy.get('#signupName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Name is invalid');
  });

  it('should show error for Name too short', () => {
    cy.get('#signupName').type('A').blur();
    cy.get('#signupName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Name has to be from 2 to 20 characters long');
  });

  it('should show error for Name too long', () => {
    cy.get('#signupName').type('A'.repeat(21)).blur();
    cy.get('#signupName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Name has to be from 2 to 20 characters long');
  });

  // --- Last name field ---
  it('should show error for empty Last name field', () => {
    cy.get('#signupLastName').focus().blur();
    cy.get('#signupLastName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Last name required');
  });

  it('should show error for invalid Last name', () => {
    cy.get('#signupLastName').type('1234').blur();
    cy.get('#signupLastName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Last name is invalid');
  });

  it('should show error for Last name too short', () => {
    cy.get('#signupLastName').type('A').blur();
    cy.get('#signupLastName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Last name has to be from 2 to 20 characters long');
  });

  it('should show error for Last name too long', () => {
    cy.get('#signupLastName').type('A'.repeat(21)).blur();
    cy.get('#signupLastName').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Last name has to be from 2 to 20 characters long');
  });

  // --- Email field ---
  it('should show error for empty Email field', () => {
    cy.get('#signupEmail').focus().blur();
    cy.get('#signupEmail').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Email required');
  });

  it('should show error for invalid Email', () => {
    cy.get('#signupEmail').type('notanemail').blur();
    cy.get('#signupEmail').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Email is incorrect');
  });

  // --- Password field ---
  it('should show error for empty Password field', () => {
    cy.get('#signupPassword').focus().blur();
    cy.get('#signupPassword').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Password required');
  });

  it('should show error for invalid Password', () => {
    cy.get('#signupPassword').type('short').blur();
    cy.get('#signupPassword').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Password has to be from 8 to 15 characters long');
  });

  // --- Re-enter password ---
  it('should show error when passwords do not match', () => {
    cy.get('#signupPassword').type('Password1');
    cy.get('#signupRepeatPassword').type('Password2').blur();
    cy.get('#signupRepeatPassword').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Passwords do not match');
  });

  it('should show error for empty Re-enter password field', () => {
    cy.get('#signupRepeatPassword').focus().blur();
    cy.get('#signupRepeatPassword').siblings('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Re-enter password required');
  });

  // --- Register button disabled ---
  it('Register button should be disabled when form is empty', () => {
    cy.get('.modal-content button[type="button"]').contains('Register')
      .should('be.disabled');
  });

  // --- Successful registration ---
  it('should register a new user successfully', () => {
    cy.get('#signupName').type('Angelina');
    cy.get('#signupLastName').type('Test');
    cy.get('#signupEmail').type('angelina.test+3@gmail.com');
    cy.get('#signupPassword').type('Password1');
    cy.get('#signupRepeatPassword').type('Password1');
    cy.get('.modal-content').find('button.btn-primary').click();
    cy.url().should('include', '/garage');
  });
});
describe('Login via custom command', () => {
  it('should login successfully with valid credentials', () => {
    cy.login('angelina.test+1@gmail.com', 'Password1');
    cy.url().should('include', '/garage');
  });
});