/// <reference types="cypress" />

import { HomePage } from "../pages/HomePage";
import { UserManagementPage } from "../pages/UserManagementPage";

const home = new HomePage();
const userManagement = new UserManagementPage();

describe('User Management test', () => {

  it('Filter system users by Admin role', () => {
    cy.visit('/')
    cy.fixture('valid_login_credentials').then((login) => {
      cy.login(login.email, login.password);
    })
    cy.url().should('include', '/dashboard/index');

    home.clickMenuOption('Admin');
    cy.url().should('include', '/admin/viewSystemUsers');

    userManagement.selectUserRole('Admin');

    cy.intercept('GET', '**/api/v2/admin/users**').as('getUsers');
    userManagement.clickSearch();
    cy.wait('@getUsers');

    userManagement.getUserRoleCells().should('have.length.greaterThan', 0);
    userManagement.getUserRoleCells().each(($cell) => {
      expect($cell.text()).to.equal('Admin');
    });
  })

})
