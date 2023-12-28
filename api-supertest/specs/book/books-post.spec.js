import supertest from "supertest";
import config from "../../framework/config/config";
import books from "../../framework/services/books";
import user from "../../framework/services/user";
import fixtures from "../../framework/services/fixtures";

describe('Books', () => {
    describe('POST /BookStore/v1/Books', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .post(`/BookStore/v1/Books/${config.isbn_1}`)
                .send({})

            expect(res.status).not.toEqual(404);
        })

        test(`Добавление книги с isbn = ${config.isbn_1} авторизованным пользователем`, async () => {
            const { userId, token } = await user.createRandomAndAuth()

            const resBooks = await books.createByISBN(
                {
                    "userId": userId,
                    "collectionOfIsbns": [
                        {
                            "isbn": config.isbn_1
                        }
                    ]
                },
                token
            )

            expect(resBooks.status).toEqual(201);
        })

        test(`Добавление книги с isbn = ${config.isbn_1} неавторизованным пользователем`, async () => {
            const resCreatedUser = await user.create({ "userName": fixtures.randomUserName(), "password": `${config.defaultPassword}`})

            const resBooks = await books.createByISBN(
                {
                    "userId": resCreatedUser.body.userID,
                    "collectionOfIsbns": [
                        {
                            "isbn": config.isbn_1
                        }
                    ]
                },
                'wrongToken'
            )

            expect(resBooks.status).toEqual(401);
        })
    })
})