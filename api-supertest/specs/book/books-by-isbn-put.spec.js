import supertest from "supertest";
import config from "../../framework/config/config";
import books from "../../framework/services/books";
import user from "../../framework/services/user";

describe('Books', () => {
    describe('PUT /BookStore/v1/Books', () => {
        test('Метод должен существовать', async () => {
            const res = await books.updateByISBN('', {}, 'wrongToken')

            expect(res.status).not.toEqual(404);
        })

        test('Обновление книги по ISBN', async () => {
            const { userId, token } = await user.createRandomAndAuth()
            const createResponse = await books.createByISBN(
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
            expect(createResponse.status).toEqual(201)

            const updateResponse = await books.updateByISBN(
                config.isbn_1,
                {
                    "userId": userId,
                    "isbn": config.isbn_2
                },
                token
            )
            
            expect(updateResponse.status).toEqual(200)
        })
    })
})