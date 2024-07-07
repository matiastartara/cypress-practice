/// <reference types="cypress" />

describe('Login test', () => {

  it('Valid login user and password test', () => {

    cy.visit('/')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/locations').as('getLocations');

    cy.fixture('valid_login_credentials').then((login) => {
      cy.login(login.email, login.password);
    })

    // Wait for the intercepted request to occur
    cy.wait('@getLocations').then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
    });

    cy.url().should('include', '/dashboard/index');

  })


  it('Invalid login user and password test', () => {
   
    cy.visit('/')
    cy.fixture('invalid_login_credentials').then((login) => {
      cy.login(login.email, login.password);
    })

    cy.get('.oxd-alert-content > .oxd-text').contains('Invalid credentials');
    cy.url().should('include', '/web/index.php/auth/login');

  });

})