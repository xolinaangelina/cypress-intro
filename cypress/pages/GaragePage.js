class GaragePage {
   selectors = {
    addCarButton: 'button',
    brandSelect: 'select#addCarBrand',
    modelSelect: 'select#addCarModel',
    mileageInput: '#addCarMileage',
    submitButton: '.modal-content button.btn-primary',
  };

  clickAddCar() {
    cy.contains(this.selectors.addCarButton, 'Add car').click();
  }

  selectBrand(brand) {
    cy.get(this.selectors.brandSelect).select(brand);
  }

  selectModel(model) {
    cy.get(this.selectors.modelSelect).select(model);
  }

  setMileage(mileage) {
    cy.get(this.selectors.mileageInput).type(mileage);
  }

   submitAddCar() {
    cy.get(this.selectors.submitButton).should('not.be.disabled').click();
  }

  carIsVisible(model) {
    cy.contains(model).should('be.visible');
  }
}

export default new GaragePage();