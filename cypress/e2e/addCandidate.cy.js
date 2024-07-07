/// <reference types="cypress" />

import AddCandidatePage from "../pages/AddCandidatePage";
import { HomePage } from "../pages/HomePage";
import RecruitmentPage from "../pages/RecruitmentPage";

const home = new HomePage();
const recruitment = new RecruitmentPage();
const addCandidatePage = new AddCandidatePage();

describe('Recruitment test', () => {

  it('Add new candidate test', () => {
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

    home.clickMenuOption('Recruitment');
    recruitment.getSubtitle().should('contain', 'Recruitment');
    recruitment.clickAdd();

    addCandidatePage.typeEmail('user@email.com');
    addCandidatePage.typeFirstName('First name');
    addCandidatePage.typeLastName('Last name');
    addCandidatePage.clickSave();
    addCandidatePage.getToastMessage().invoke('text').should('contain', 'Successfully Saved')

  })

})