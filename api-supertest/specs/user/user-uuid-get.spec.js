import supertest from "supertest";
import config from "../../framework/config/config";
import user from "../../framework/services/user";
import fixtures from "../../framework/services/fixtures";

describe('User', () => {
    describe('GET /Account/v1/User/{UUID}', () => {
        test('Метод должен существовать', async () => {
            const res = await user.get(0, 'wrongToken')

            expect(res.status).not.toEqual(404)
        })

        test('Получение существующего пользователя', async () => {
            const { userId, token } = await user.createRandomAndAuth()
            const getRes = await user.get(userId, token)

            expect(getRes.status).toEqual(200)
            expect(getRes.body.userId).toEqual(userId)
        })
    })
})