import supertest from "supertest";
import config from "../../framework/config/config";
import user from "../../framework/services/user";
import fixtures from "../../framework/services/fixtures";

describe('User', () => {
  describe('POST /Account/v1/User', () => {
    test('Метод должен существовать', async () => {
      const res = await user.create({})

      expect(res.status).not.toEqual(404);
    })

    test('Создание нового пользователя парой userName и password', async () => {
      const res = await user.create({ "userName" : fixtures.randomUserName(), "password": `${config.defaultPassword}` })

      expect(res.status).toEqual(201);
      expect(typeof res.body.userID).toEqual('string')
      expect(typeof res.body.username).toEqual('string')
    })

    test('Создание пользователя с уже созданной парой с userName и password', async () => {
      const payload = { "userName" : fixtures.randomUserName(), "password": `${config.defaultPassword}` }

      await user.create(payload)

      const res = await user.create(payload)

      expect(res.status).toEqual(406);
      expect(res.body.code).toEqual('1204')
      expect(res.body.message).toEqual('User exists!')
    })
  })
})