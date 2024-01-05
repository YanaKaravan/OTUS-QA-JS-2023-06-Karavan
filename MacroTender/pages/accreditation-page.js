const Multiselect = require('./elements/multiselect')

class AccreditationPage {
    constructor(page) {
        this.page = page;
        this._selectCategories = new Multiselect(page, 'div.ui-multiselect');
        this._inputComment = page.locator('[class="v-textarea"]')
    };

    async selectCategories(categories) {
       await this._selectCategories.select(categories)
    };

    // async clickSearchBtn() {
    //     await this._searchBtn.click();
    // };

    async fillComment(text) {
        await this._inputComment.type(text)
    };

}

    module.exports = AccreditationPage;