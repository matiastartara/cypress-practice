export class LoginPage {

   completeUsername(username){
       const field = cy.get('[name="username"]');
       field.clear();
       field.type(username);
   }

   completePassword(password){
    const field = cy.get('[name="password"]');
    field.clear();
    field.type(password);
   }

    clickOnSign(){
        cy.get('[type="submit"]').click();
    }   

}
export default LoginPage;