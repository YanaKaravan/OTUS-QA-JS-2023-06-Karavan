class LoginPage {
    constructor(page) {
        this.page = page;
        this._inputEmail = page.locator('input[name="email"]');
        this._inputPassword = page.locator('input[name="password"]');
        this._loginBtn = page.locator('button[type="submit"]');
        this._userName = page.locator('[class=sidebar-user]');
    }

    async fillLoginForm(login, password) {
        await this._inputEmail.fill(login)
        await this._inputPassword.fill(password)
    };

    async clickLoginBtn() {
        await this._loginBtn.click();
    };

    async testLogin() {
        await this.page.goto('https://tender.realdb.ru/account/tenders');
        await this.page.waitForTimeout(2000)
        await this.fillLoginForm('wasose1787@jybra.com', '123456789Wa-');
        await this.clickLoginBtn();
        await this.page.waitForTimeout(1000)
    };
}

module.exports = LoginPage;