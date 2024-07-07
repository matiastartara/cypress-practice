export class HomePage {

    clickMenuOption(option) {
        cy.get('.oxd-main-menu-item span').contains(option).click()
    }
    
}
export default HomePage;