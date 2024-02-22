/// <reference types='codeceptjs' />
const config = require('../framework/config/config.js')
const expect = require('chai').expect;

const { I, loginPage } = inject();

Given('Пользователь открывает страницу авторизации', () => {
  loginPage.visit();
});

When('Пользователь вводит правильные учетные данные', () => {
  const { user } = config.credentials;
  loginPage.login(user);
});

Then('Пользователь успешно авторизован и перенаправлен на главную страницу', async () => {
  I.seeCurrentUrlEquals('https://realdb.ru/account/dashboard/')
});

When('Пользователь не вводит пароль', () => {
  const { user } = config.credentials;
  loginPage.login({
    username: user.username,
    password: ''
  });
});

Then('Появляется сообщение об ошибке "Нужны и логин и пароль!"', async () => {
  const expectedErrorMessage = 'Нужны и логин и пароль!';
  await expect(await loginPage.getPasswordError()).to.be.equal(expectedErrorMessage);
  I.seeCurrentUrlEquals('https://realdb.ru/account/login/check.html')
});

When('Пользователь вводит логин и пароль', (login, password) => {
  loginPage.login({
    username: login,
    password
  });
});
