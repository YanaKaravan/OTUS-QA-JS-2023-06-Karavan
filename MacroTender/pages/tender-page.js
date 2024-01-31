class TenderPage {
    constructor(page) {
        this.page = page;
        this._inputPrice = page.locator('input[name="item_price"]');
        this._divComment = page.locator('div[name="description_bid"]');
        this._participateBtn = page.locator('[class="btn btn-lg btn-primary"]');
        this._sendBtn = page.locator('button[name="addNewBid"]').first();
        this._refusalBtn = page.locator('button[name="rejectBid"]')
    };

    async itemPrice(text) {
        await this._inputPrice.fill(text)
    };

    async typeComment(text) {
        await this._divComment.type(text);
    };

    async clickParticipate() {
        await this._participateBtn.click()
    };

    async clickSendBtn() {
        await this._sendBtn.click();
    };

    async clickRefusalBtn() {
        await this._refusalBtn.click();
    };

}

    module.exports = TenderPage;