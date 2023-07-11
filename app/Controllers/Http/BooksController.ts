import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Lib from 'App/Models/Lib'
import Book from 'App/Models/Book'
import Person from 'App/Models/Person'

import bodyParserConfig from 'Config/bodyparser'


export default class BooksController {

    public async store({request,response} : HttpContextContract){

        const body = request.body()
        const library = await Lib.firstOrCreate({"library" : body.library})
        await library.save()

        const books = await Book.create({library:body.library, book:body.book, person:body.person})
        await books.save()

        response.status(201)
        
    return {
        msg : 'Criado com sucesso',
        data : books
    }

    }

    public async index(){
        
        const book = await Book.all()
        return{
            data : book
        }
    }

    public async show({ params } : HttpContextContract) {

        const book = await Book.findByOrFail("id", params.id)

        return {
            data : book
        }
        
    }
    
    public async destroy({ params } : HttpContextContract) {

        const book = await Book.findByOrFail('id', params.id)

        await book.delete()

        return {
            msg : `Livro ${book.book} excluído`,
        }
        
    }
}
