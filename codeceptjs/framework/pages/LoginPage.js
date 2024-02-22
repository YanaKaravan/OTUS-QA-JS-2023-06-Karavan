const { I } = inject();

module.exports = {
  // локаторы
  fields: {
    username: '#username',
    password: '#password'
  },
  submitButton: locate('button').withText('Войти'),
  errors: {
    password: '.password-field + p'
  },

  // методы
  visit () {
    I.amOnPage('https://realdb.ru/account/login/?retpath=/account/')
    I.see('Войти')
  },

  fillUsername (username) {
    I.fillField(this.fields.username, username)
  },
  fillPassword (password) {
    I.fillField(this.fields.password, password)
  },
  submitForm () {
    I.click(this.submitButton)
  },
  async getPasswordError () {
    return await I.grabTextFrom(this.errors.password)
  },
  login ({ username, password }) {
    this.visit()
    this.fillUsername(username)
    this.fillPassword(password)
    this.submitForm()
  }
}
