export class UserManagementPage {

    selectUserRole(role) {
        cy.contains('.oxd-input-group', 'User Role').find('.oxd-select-text').click();
        cy.get('.oxd-select-dropdown').contains('.oxd-select-option', role).click();
    }

    clickSearch() {
        cy.get('button[type=submit]').click();
    }

    getUserRoleCells() {
        return cy.get('.oxd-table-card .oxd-table-row .oxd-table-cell:nth-child(3)');
    }

}
export default UserManagementPage;
