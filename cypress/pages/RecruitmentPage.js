export class RecruitmentPage {

    clickAdd() {
        cy.get('.orangehrm-header-container > .oxd-button').click();
    }

    getSubtitle() {
        return cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
            .invoke('text')
            .then(texto => {
                return texto.trim();
            });
    }


}
export default RecruitmentPage;