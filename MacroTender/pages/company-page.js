class CompanyPage {
    constructor(page) {
        this.page = page;
        this._inputInn = page.locator('input[placeholder="Поиск по ИНН…"]');
        this._searchBtn = page.locator('button[class="btn btn-success btn-lg m-b-20"]')
    };

    async fillInn(inn) {
        await this._inputInn.fill(inn)
    };

    async clickSearchBtn() {
        await this._searchBtn.click();
    };

}

    module.exports = CompanyPage;