import supertest from "supertest";

import config from "../config/config";
const { faker } = require('@faker-js/faker');
const { url } = config


const book = {

    delete: (payload, token) => {
        return supertest(url)
            .delete(`/BookStore/v1/Book`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(payload)
    },

    get: (isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            .send()
    }
}

export default book