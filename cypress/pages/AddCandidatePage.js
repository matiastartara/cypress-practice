export class AddCandidatePage {
  
    typeFirstName(firstName) {
        cy.get('input[name=firstName]').type(firstName);
    }

    typeLastName(lastName) {
        cy.get('input[name=lastName]').type(lastName);
    }

    typeEmail(email) {
        cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(email);
    }

    clickSave() {
        cy.get('button[type=submit]').click();
    }

    getToastMessage() {
        return cy.get('.oxd-toast');
    }

}
export default AddCandidatePage;