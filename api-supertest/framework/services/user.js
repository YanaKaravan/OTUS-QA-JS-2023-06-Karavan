import supertest from "supertest";

import config from "../config/config";
import fixtures from "../../framework/services/fixtures";

const { url } = config

// контроллер user
const user = {
    
    create: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(payload)
    },

    getToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload)
    },

    delete: (uuid, token) => {
        return supertest(url)
            .delete(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send()
    },

    get: (uuid, token) => {
        return supertest(url)
            .get(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send()
    },

    createRandomAndAuth: async () => {
        const userName = fixtures.randomUserName()
        const password = config.defaultPassword
        const resCreatedUser = await user.create({ userName: userName, password: password })
        
        const userId = resCreatedUser.body.userID
        const tokenRes = await user.getToken({ userName: userName, password: password })
        
        const token = tokenRes.body.token

        return {userId: userId, token: token}
    }
}

export default user