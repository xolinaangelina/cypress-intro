import GaragePage from '../pages/GaragePage';
import ExpensesPage from '../pages/ExpensesPage';

describe('Garage and Fuel Expenses', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  it('should add a car to garage', () => {
    GaragePage.clickAddCar();
    GaragePage.selectBrand('Audi');
    GaragePage.selectModel('TT');
    GaragePage.setMileage('10000');
    GaragePage.submitAddCar();
    GaragePage.carIsVisible('Audi TT');
  });

  it('should add fuel expense to the car', () => {
    cy.contains('a', 'Fuel expenses').click();
    ExpensesPage.clickAddExpense();
    ExpensesPage.setMileage('10500');
    ExpensesPage.setLiters('40');
    ExpensesPage.setTotalCost('60');
    ExpensesPage.submitExpense();
    cy.contains('10500').should('be.visible');
  });
});