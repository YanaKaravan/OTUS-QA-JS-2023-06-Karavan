import supertest from "supertest";
import config from "../../framework/config/config";
import book from "../../framework/services/book";
import books from "../../framework/services/books";
import user from "../../framework/services/user";

describe('Book', () => {
    describe('POST /BookStore/v1/Book', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .delete('/BookStore/v1/Book')
                .send({})

            expect(res.status).not.toEqual(404);
        })

        
        test('Удаление книги по ISBN', async () => {

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

            const res = await book.delete(
                {isbn: config.isbn_1, userId: userId}, 
                token
            )

            expect(res.status).toEqual(204);
        })

       

    })
})