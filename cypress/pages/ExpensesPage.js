class ExpensesPage {
  selectors = {
    fuelExpensesLink: 'a[routerlink="expenses"]',
    addExpenseButton: 'button',
    mileageInput: '#addExpenseMileage',
    litersInput: '#addExpenseLiters',
    totalCostInput: '#addExpenseTotalCost',
    submitButton: '.modal-content button.btn-primary',
  };

  clickFuelExpenses() {
    cy.get(this.selectors.fuelExpensesLink).click();
  }

  clickAddExpense() {
    cy.contains(this.selectors.addExpenseButton, 'Add an expense').click();
  }

  setMileage(mileage) {
    cy.get(this.selectors.mileageInput).clear().type(mileage);
  }

  setLiters(liters) {
    cy.get(this.selectors.litersInput).type(liters);
  }

  setTotalCost(cost) {
    cy.get(this.selectors.totalCostInput).type(cost);
  }

  submitExpense() {
    cy.get(this.selectors.submitButton).click();
  }
}
export default new ExpensesPage();