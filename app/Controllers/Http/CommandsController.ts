import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Request, Response } from '@adonisjs/core/build/standalone'

import Lib from 'App/Models/Lib'
import Book from 'App/Models/Book'
import bodyParserConfig from 'Config/bodyparser'
import Person from 'App/Models/Person'

export default class CommandsController {

    public async take( {params, request} : HttpContextContract){

        const library = await Book.findByOrFail("id", params.id)

        if (library.person){
            return{
                msg : "Este livro não está disponível"
                }
            }
        const body = request.body()
        const person = await Person.findByOrFail("person", body.person)
                
        library.person = body.person
        person.book_id = params.id
    
        await library.save()
    
        return {
            data : library
            }

    }
    public async return_book( {params} : HttpContextContract){

        const library = await Book.findByOrFail('id', params.id)


        if (library.person != null) {
        const person = await Person.findByOrFail("person", library.person)
        library.person = null
        person.book_id = null

        await library.save()

        return {
            msg : `Livro ${library.book} foi retornado`,
            data : library
        }
    }
}

public async get_books( {params, request} : HttpContextContract){

    const req_url = await request.only(['avaliable'])
    if (req_url.avaliable == 'false'){
        const library = await Book.query().where('library', params.library)
        return {
            data : library
        }
    }

    const library = await Book.query().where('library', params.library).where('person', null)
    return {
        data : library
    }
}

public async transfer( {params, request} : HttpContextContract){

    const body = request.body()

    const book = await Book.findByOrFail("id", params.id)
    book.library = body.library

    return {
        data : book
    }
}

}
