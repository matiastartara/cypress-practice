/// <reference types="cypress" />

describe('Login test', () => {

  it('Valid login user and password test', () => {

    cy.visit('/')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/locations').as('getLocations');

    cy.fixture('loginCredentials').then((login) => {
      cy.login("Admin", "admin123");
    })

     // Wait for the intercepted request to occur
     cy.wait('@getLocations').then((interception) => {
      // Access the intercepted request details
      const request = interception.request;
      const response = interception.response;

      expect(response.statusCode).to.equal(200);
    });

    cy.url().should('include','/dashboard/index');

  })
})