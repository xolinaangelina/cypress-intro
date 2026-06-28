import GaragePage from '../pages/GaragePage';

describe('Garage and Fuel Expenses', () => {
  let createdCarId;

  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  afterEach(() => {
    if (createdCarId) {
      cy.getCookies().then((cookies) => {
        const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
        cy.request({
          method: 'DELETE',
          url: `/api/cars/${createdCarId}`,
          headers: { Cookie: cookieString },
          failOnStatusCode: false,
        });
      });
      createdCarId = null;
    }
  });

  it('should add a car to garage', () => {
    cy.intercept('POST', '/api/cars').as('createCar');
    GaragePage.clickAddCar();
    GaragePage.selectBrand('Audi');
    GaragePage.selectModel('TT');
    GaragePage.setMileage('10000');
    GaragePage.submitAddCar();
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      createdCarId = interception.response.body.data.id;
      expect(createdCarId).to.exist;
    });
    GaragePage.carIsVisible('Audi TT');
  });

  it('should validate created car via API', function () {
    cy.intercept('POST', '/api/cars').as('createCar');
    GaragePage.clickAddCar();
    GaragePage.selectBrand('Audi');
    GaragePage.selectModel('TT');
    GaragePage.setMileage('10000');
    GaragePage.submitAddCar();
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      createdCarId = interception.response.body.data.id;
      cy.getCookies().then((cookies) => {
        const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
        cy.request({
          method: 'GET',
          url: '/api/cars',
          headers: { Cookie: cookieString },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const cars = response.body.data;
          const createdCar = cars.find((car) => car.id === createdCarId);
          expect(createdCar).to.exist;
          expect(createdCar.brand).to.eq('Audi');
          expect(createdCar.model).to.eq('TT');
          expect(createdCar.initialMileage).to.eq(10000);
        });
      });
    });
  });

  it('should create expense via API and validate response', function () {
    cy.intercept('POST', '/api/cars').as('createCar');
    GaragePage.clickAddCar();
    GaragePage.selectBrand('Audi');
    GaragePage.selectModel('TT');
    GaragePage.setMileage('10000');
    GaragePage.submitAddCar();
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      createdCarId = interception.response.body.data.id;
      cy.createExpenseViaApi(createdCarId, 10500, 40, 60);
      cy.get('@expenseResponse').then((response) => {
        expect(response.status).to.eq(200);
        const expense = response.body.data;
        expect(expense.carId).to.eq(createdCarId);
        expect(expense.mileage).to.eq(10500);
        expect(expense.liters).to.eq(40);
        expect(expense.totalCost).to.eq(60);
      });
    });
  });

  it('should validate expense via UI', function () {
    cy.intercept('POST', '/api/cars').as('createCar');
    GaragePage.clickAddCar();
    GaragePage.selectBrand('Audi');
    GaragePage.selectModel('TT');
    GaragePage.setMileage('10000');
    GaragePage.submitAddCar();
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      createdCarId = interception.response.body.data.id;
      cy.createExpenseViaApi(createdCarId, 10500, 40, 60);
      cy.contains('a', 'Fuel expenses').click();
      cy.get('#carSelectDropdown').should('contain', 'Audi TT');
      cy.contains('60.00').should('be.visible');
    });
  });
});