class ExpensesPage {
  clickFuelExpenses() {
    cy.get('a[routerlink="expenses"]').click();
  }

  clickAddExpense() {
    cy.contains('button', 'Add an expense').click();
  }

  setMileage(mileage) {
    cy.get('#addExpenseMileage').clear().type(mileage);
  }

  setLiters(liters) {
    cy.get('#addExpenseLiters').type(liters);
  }

  setTotalCost(cost) {
    cy.get('#addExpenseTotalCost').type(cost);
  }

  submitExpense() {
    cy.get('.modal-content button.btn-primary').click();
  }
}
export default new ExpensesPage();
