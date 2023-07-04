import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Request } from '@adonisjs/core/build/standalone'

import Lib from 'App/Models/Lib'
import bodyParserConfig from 'Config/bodyparser'

export default class CommandsController {

    public async take( {params, request} : HttpContextContract){

        const library = await Lib.findOrFail(params.id)


        if (library.person == null){

        const body = request.body()

        library.person = body.person

        library.save()

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
    public async return( {params, request} : HttpContextContract){

        const library = await Lib.findOrFail(params.id)
        const body = request.body()


        if (library.person != null) {
        library.person = null

        library.save()

        return {
            msg : `Livro ${library.book} foi retornado`,
            data : library
        }
    }
}
    public async avaliable( {params, request} : HttpContextContract){

        const body = await request.body()
        console.log(body.person)
        const library = await Lib.query().where('lib', params.id).where('person', null)

        return {
            data : library
        }
    }


    public async all( {params, request} : HttpContextContract){

        const body = await request.body()
        console.log(body.person)
        const library = await Lib.query().where('lib', params.id)
        return {
            data : library
        }
    }

}
