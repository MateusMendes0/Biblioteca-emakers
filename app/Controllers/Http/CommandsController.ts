import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Request, Response } from '@adonisjs/core/build/standalone'

import Lib from 'App/Models/Lib'
import Book from 'App/Models/Book'
import bodyParserConfig from 'Config/bodyparser'

export default class CommandsController {

    public async take( {params, request} : HttpContextContract){

        const library = await Book.findByOrFail("id", params.id)


        if (library.person == null){

        const body = request.body()

        library.person = body.person

        await library.save()

        return {
            data : library
        }
    }   
    else {
        return{
            
            msg : "Este livro não está disponível"
        }
    }
    }
    public async return_book( {params} : HttpContextContract){

        const library = await Book.findByOrFail('id', params.id)


        if (library.person != null) {
        library.person = null

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

}
