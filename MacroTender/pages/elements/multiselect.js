class Multiselect{
    constructor(page, element) {
        this.page = page;
        this.element = element;
    };

    async select(values) {
        await this.page.locator(this.element + ' .ui-input-group').click();
        await this.page.waitForTimeout(500)
        for (let value of values) {
            await this.page.locator(this.element + ' [type="checkbox"][value="'+value+'"]').check({timeout:500})

        }
    };
}

module.exports = Multiselect;