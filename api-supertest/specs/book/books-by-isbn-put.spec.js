import supertest from "supertest";
import config from "../../framework/config/config";
import books from "../../framework/services/books";
import user from "../../framework/services/user";
import fixtures from "../../framework/services/fixtures";

describe('Books', () => {
    describe('DELETE /BookStore/v1/Books', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .put(`/BookStore/v1/Books/${config.isbn_1}`)
                .send({})

            expect(res.status).not.toEqual(404);
        })

        test('Метод должен существовать', async () => {
            const resCreatedUser = await user.create({ "userName": fixtures.randomUserName(), "password": `${config.defaultPassword}`})

            console.log(resCreatedUser.body.userID)

            const resBooks = await books.updateByISBN(config.isbn_1,
                {
                    "userId": resCreatedUser.body.userID,
                    "isbn": config.isbn_1
                })

            expect(resBooks.status).toEqual(401);
        })
    })
})