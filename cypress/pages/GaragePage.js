class GaragePage {
  clickAddCar() {
    cy.contains('button', 'Add car').click();
  }

  selectBrand(brand) {
    cy.get('select#addCarBrand').select(brand);
  }

  selectModel(model) {
    cy.get('select#addCarModel').select(model);
  }

  setMileage(mileage) {
    cy.get('#addCarMileage').type(mileage);
  }

  submitAddCar() {
    cy.get('.modal-content button.btn-primary').click();
  }

  carIsVisible(model) {
    cy.contains(model).should('be.visible');
  }
}

export default new GaragePage();