Feature: Авторизация BDD

  Scenario: Успешная авторизация
    Given Пользователь открывает страницу авторизации
    When Пользователь вводит правильные учетные данные
    Then Пользователь успешно авторизован и перенаправлен на главную страницу

  Scenario Outline: Успешная авторизация параметризованная
    Given Пользователь открывает страницу авторизации
    When Пользователь вводит логин <username> и пароль <password>
    Then Пользователь успешно авторизован и перенаправлен на главную страницу
    Examples:
      | username               | password               |
      | demo                   | demo                   |
      | riyijiy166@eimatro.com | riyijiy166@eimatro.com |

  Scenario: Невозможно авторизоваться без пароля
    Given Пользователь открывает страницу авторизации
    When Пользователь не вводит пароль
    Then Появляется сообщение об ошибке "Введите пароль" и пользователь остается на странице авторизации

  Scenario: Новый сценарий
    Given Пользовать что-то делает
    Then Что-то проверяем

  Scenario: Пришли на вебинар
    Given Получили новые знания
    Then Смогли применить на практике
