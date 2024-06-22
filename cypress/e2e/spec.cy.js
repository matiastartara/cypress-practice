/// <reference types="cypress" />

import { LoginPage } from "../pages/LoginPage";

describe('template spec', () => {

  const loginPage = new LoginPage();

  it('passes', () => {
    cy.visit('/')
    loginPage.completeUsername("Admin");
    loginPage.completePassword("admin123");
    loginPage.clickOnSign();

  })
})