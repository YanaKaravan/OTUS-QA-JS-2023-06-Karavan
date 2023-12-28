import supertest from "supertest";
import config from "../../framework/config/config";
import user from "../../framework/services/user";
import fixtures from "../../framework/services/fixtures";

describe('User', () => {
    describe('DELETE /Account/v1/User/{UUID}', () => {
        test('Метод должен существовать', async () => {
            const res = await user.delete('0', 'wrongToken')

            expect(res.status).not.toEqual(404);
        })

        test('Удаление пользователя по uuid (без авторизации)', async () => {
            const { userId, token } = await user.createRandomAndAuth()
            const deleteRes = await user.delete(userId, 'wrongToken')
        
            //expect(deleteRes.status).toEqual(204)
            expect(deleteRes.status).toEqual(401) 
            expect(deleteRes.body.code).toEqual('1200')
        })

        // test('Удаление пользователя по uuid (с авторизацией)', async () => {
        //     const { userId, token } = await user.createRandomAndAuth()
        //     //console.log([userId, token])
        //     const deleteRes = await user.delete(userId, token)
        //     //console.log(deleteRes.body)
        //     expect(deleteRes.status).toEqual(200)
        //     expect(deleteRes.body.code).toEqual('0')
        // })
    })
})