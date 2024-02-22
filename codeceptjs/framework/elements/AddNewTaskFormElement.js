const { I } = inject();

module.exports = {
  root: locate('.task-add'),
  taskField: 'textarea[placeholder="Add a new task…"]',

  fillTask (task) {
    // const taskField = 'textarea[placeholder="Add a new task…"]'
    I.fillField(this.taskField, task)
  },

  submit () {
    I.click(locate('button').withText('Add'))
  },

  createTask (task) {
    this.fillTask(task)
    this.submit()
  }
}
