class CompanyPage {
    constructor(page) {
        this.page = page;
        this._inputInn = page.locator('input[name="searchInn"]');
        this._searchBtn = page.locator('button[name="searchBtn"]');
        this._saveBtn = page.locator('button[name="saveBtn"]');
        this._removeBtn = page.locator('button[name="removeBtn"]');
    };

    async fillInn(inn) {
        await this._inputInn.fill(inn)
    };

    async clickSearchBtn() {
        await this._searchBtn.click();
    };

    async clickSaveBtn() {
        await this._saveBtn.click();
    };

    async clickRemoveBtn() {
        await this._removeBtn.click();
    };
    
}

    module.exports = CompanyPage;