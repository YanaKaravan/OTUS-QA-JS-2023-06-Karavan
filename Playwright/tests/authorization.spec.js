// @ts-check
const { test, expect } = require('@playwright/test');

test('Страница авторизации', async ({ page }) => {
  await page.goto('https://realdb.ru/account/login/?retpath=/account/');
  await expect(page.locator('[class="box-login"]')).toHaveScreenshot('box authrization.png')
});

test('Вход без заполненных данных', async ({ page }) => {
  await page.goto('https://realdb.ru/account/login/?retpath=/account/');
  await page.locator('input[name="login"]').clear()
  await page.locator('input[name="password"]').clear()
  await page.locator('[title="Войти"]').click();
  await page.waitForTimeout(1000)
  await expect(page.locator('[class="errorHandler alert alert-danger"]')).toContainText([' Нужны и логин и пароль!        ']);
});

test('Вход с неверным логином/паролем', async ({ page }) => {
  await page.goto('https://realdb.ru/account/login/?retpath=/account/');
  await page.locator('input[name="login"]').fill('user00000')
  await page.locator('input[name="password"]').fill('f111111111')
  await page.locator('[title="Войти"]').click();
  await page.waitForTimeout(1000)
  await expect(page.locator('[class="errorHandler alert alert-danger"]')).toContainText([' Пользователь не найден        ']);
});

test('Успешный вход', async ({ page }) => {
  await page.goto('https://realdb.ru/account/login/?retpath=/account/');
  await page.locator('input[name="login"]').fill('user14109')
  await page.locator('input[name="password"]').fill('96glm58b')
  await page.locator('[title="Войти"]').click();
  await page.waitForTimeout(1000)
  await expect(page).toHaveURL('https://realdb.ru/account/dashboard/');
});

test('Забыли данные для входа', async ({ page }) => {
  await page.goto('https://realdb.ru/account/login/?retpath=/account/');
  await page.locator('[class="forgot"]').click();
  await page.waitForTimeout(1000)
  await expect(page).toHaveURL('https://realdb.ru/account/restore/');
  await page.locator('input[name="email"]').waitFor({state:"visible"}) 
  await page.locator('[title="Восстановить"]').waitFor({state:"visible"}) 
})
