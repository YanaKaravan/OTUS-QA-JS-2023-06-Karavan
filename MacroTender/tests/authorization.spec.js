const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login-page');
const CompanyPage = require('../pages/company-page')
const AccreditationPage = require('../pages/accreditation-page')


test('Успешный вход', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.testLogin()
    await loginPage._userName.waitFor({state:"visible"}) 
});

test('Поиск существующего в Macro контрагента', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.testLogin()
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn('6456458002');
    await companyPage.clickSearchBtn();
    await page.waitForTimeout(1000)
    await expect(page.locator('[class="font-middle-400 gray-text-900"]')).toContainText(['СнабСтрой']);
});

test('Поиск существующего контрагента незарегистрированного в Macro', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.testLogin()
    const companyPage = new CompanyPage(page);
    await page.goto('https://tender.realdb.ru/account/profile/company');
    await page.waitForTimeout(2000)
    await companyPage.fillInn('7723107750');
    await companyPage.clickSearchBtn();
    await page.waitForTimeout(1000)
    //await expect(page.locator('input:nth-child(2)')).toHaveValue('АЛАЖАРВИ');
});

test('Заполнение заявки на аккредитацию', async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.testLogin()
    const accreditationPage = new AccreditationPage(page);
    await page.goto('https://tender.realdb.ru/account/accreditation');
    await page.waitForTimeout(2000)
    await accreditationPage.selectCategories(['26', '43'])
    await accreditationPage.fillComment('Прошу принять мою заявку на аккредитацию')
})