import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });
    
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
        });

    it('Верный пароль и верный логин', function () {
         
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         
         cy.get(result_page.title).contains('Авторизация прошла успешно');
         cy.get(result_page.title).should('be.visible');
     
    })

    it('логика восстановления пароля', function () {

        cy.get(main_page.fogot_pass_btn).click();
        
        cy.get(recovery_password_page.title).contains('Восстановите пароль');
        cy.get(recovery_password_page.title).should('be.visible');
        cy.get(recovery_password_page.close).should('be.visible');
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.title).should('be.visible');
     
    })

    it('Неверный пароль и верный логин', function () {
 
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iLoveqastudio2000');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.title).should('be.visible');
    
   })

   it('Верный пароль и неверный логин', function () {

    cy.get(main_page.email).type('german@olnikov.ru');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Такого логина или пароля нет');
    cy.get(result_page.title).should('be.visible');

})

it('Верный пароль и логин без @', function () {


    cy.get(main_page.email).type('germandolnikov.ru');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    cy.get(result_page.title).should('be.visible');


})

it('Верный пароль и верный логин строчными буквами', function () {


    cy.get(main_page.email).type('GerMan@Dolnikov.ru');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page).contains('Авторизация прошла успешно');
    cy.get(result_page.title).should('be.visible');


})
})