const { I } = inject();

module.exports = {
  visit (taskId) {
    I.amOnPage(`https://realdb.ru/account/login/?retpath=/account/${taskId}`)
  },
  
  hasTitle (title) {
    I.see(title)
  },

  getTitle () {
    return I.grabTextFrom('.title.input')
  }
}
