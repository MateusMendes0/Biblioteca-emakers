import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Request, Response } from '@adonisjs/core/build/standalone'

import Lib from 'App/Models/Lib'
import Book from 'App/Models/Book'
import Person from 'App/Models/Person'

export default class CommandsController {

    public async take( {params, request} : HttpContextContract){

        const body = request.body()
        const library = await Book.findByOrFail("id", params.id)
        
        if (library.personId){
            return{
                message : "Este livro não está disponível"
            }
        }
        const person = await Person.findByOrFail("person", body.person)
        library.personId = person.id
    
        await library.save()
    
        return {
            data : library
            }

    }
    public async return_book( {params,response} : HttpContextContract){

        const library = await Book.findByOrFail('id', params.id)

        library.personId = null

        await library.save()

        response.status(201)
        return {
            message : `Livro ${library.book} foi retornado`,
            data : library
        }
    }

    public async get_books( {params, request} : HttpContextContract){

        const req_url = await request.only(['avaliable'])
        if (req_url.avaliable == 'false'){
            const library = await Book.query().where('library_id', params.library)
            return {
                data : library
            }
        }

        const library = await Book.query().where('library_id', params.library).where('person_id', null)
        return {
            data : library
        }
    }

    public async transfer( {params, request} : HttpContextContract){

        const body = request.body()

        const book = await Book.findByOrFail("id", params.id)
        book.library_id = body.library_id
        book.save()

        return {
            data : book
        }
    }

}
