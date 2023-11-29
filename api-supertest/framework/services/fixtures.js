//import supertest from "supertest";

//import config from "../config/config";
const { faker } = require('@faker-js/faker');
//const { url } = config

const fixtures = {
    randomUserName() {
        return `${faker.person.lastName()}-${faker.person.firstName()}`;
    },

    randomISBN() {
        return faker.commerce.isbn({ variant : 13, separator:""});
    }
}

export default fixtures