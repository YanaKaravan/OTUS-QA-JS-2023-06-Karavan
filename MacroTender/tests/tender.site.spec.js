const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login-page');
const CompanyPage = require('../pages/company-page')
const TenderPage = require('../pages/tender-page')
import {users} from "../specs/users" 
import {companies} from "../specs/companies";


test('Успешный вход', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    await loginPage._userName.waitFor({state:"visible"}) 
});

test('Поиск контрагента использующего тендерную площадку', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn(companies.existing.inn);
    await companyPage.clickSearchBtn();
    await expect(page.getByText("Компания уже использует тендерную площадку")).toBeVisible();       
});

test('Поиск зарегистрированного в Macro контрагента, но неиспользующего тендерную площадку', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn(companies.registered.inn);
    await companyPage.clickSearchBtn();
    await expect(page.locator('[class="font-middle-400 gray-text-900"]')).toContainText(['ООО "Сововый застройщик"']);       
});

test('Поиск существующего контрагента незарегистрированного в Macro', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn(companies.notExisting.inn);
    await companyPage.clickSearchBtn();
    await page.waitForTimeout(1000)
    await expect(page.locator('input[name="name"]')).toHaveValue('АЛАЖАРВИ');
    await expect(page.getByText("Ваша компания не найдена. Внесите данные вручную.")).toBeVisible();
});

test('Поиск несуществующего контрагента', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn(companies.fake.inn);
    await companyPage.clickSearchBtn();
    await page.waitForTimeout(1000)
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="inn"]')).toHaveValue('65841616112');
    await expect(page.getByText("Ваша компания не найдена. Внесите данные вручную.")).toBeVisible();
});

test('Привязка контрагента к пользователю', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn(companies.registered.inn);
    await companyPage.clickSearchBtn();
    await companyPage.clickSaveBtn();
    await page.waitForTimeout(1000)
    await expect(page.locator('button[name="removeBtn"]')).toBeVisible();
});

test('Удаление привязки контрагента к пользователю', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user1)
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    page.on('dialog', dialog => dialog.accept());
    await companyPage.clickRemoveBtn();
    await page.waitForTimeout(5000)
    await expect(page.locator('button[name="searchBtn"]')).toBeVisible();
});

test('Участвовать в тендере', async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user2)
    const tenderPage = new TenderPage(page);
    await page.goto('https://tender.realdb.ru/account/tenders/32');
    await page.waitForTimeout(2000)
    await tenderPage.clickParticipate();
    await page.waitForTimeout(2000)
    await tenderPage.itemPrice('5500')
    await tenderPage.typeComment('Прошу принять мою заявку на участие в тендере')
    await tenderPage.clickSendBtn()
});

test('Отказ от участия в тендере', async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.login(users.user2)
    const tenderPage = new TenderPage(page);
    await page.goto('https://tender.realdb.ru/account/tenders/32');
    await page.waitForTimeout(2000)
    page.on('dialog', dialog => dialog.accept());
    await tenderPage.clickRefusalBtn();
    await page.waitForTimeout(1000)
    await expect(page.getByText("Отмена")).toBeVisible();
})