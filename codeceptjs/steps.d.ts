/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type loginPage = typeof import('./framework/pages/LoginPage.js');
type mainPage = typeof import('./framework/pages/MainPage.js');
type addNewTaskFormElement = typeof import('./framework/elements/AddNewTaskFormElement.js');
type taskListElement = typeof import('./framework/elements/TaskListElement.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, mainPage: mainPage, addNewTaskFormElement: addNewTaskFormElement, taskListElement: taskListElement }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
