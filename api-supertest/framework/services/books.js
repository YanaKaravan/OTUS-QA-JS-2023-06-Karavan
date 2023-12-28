import supertest from "supertest";

import config from "../config/config";
const { faker } = require('@faker-js/faker');
const { url } = config


const books = {
    
    getAll: () => {
        return supertest(url)
            .get(`/BookStore/v1/Books/`)
            .set('Accept', 'application/json')
            .send()
    },

    createByISBN: (payload, token) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(payload)
    },

    updateByISBN: (isbn, payload, token) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${isbn}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(payload)
    },

    deleteByUserID: (userId, token) => {
        return supertest(url)
            .delete(`/BookStore/v1/Books?UserId=${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send()
    },

}

export default books