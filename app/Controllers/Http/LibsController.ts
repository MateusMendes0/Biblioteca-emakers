import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Lib from 'App/Models/Lib'
import bodyParserConfig from 'Config/bodyparser'

export default class LibsController {
    public async store({request,response} : HttpContextContract){

        
        const body = request.body()
        const library = await Lib.create(body)

        response.status(201)
        
    return {
        msg : 'Criado com sucesso',
        data : library
    }

    }

    public async index(){


        const library = await Lib.all()
        return{
            data : library
        }
    }

    public async show({ params } : HttpContextContract){

        const library = await Lib.findOrFail(params.id)

        return {
            data : library
        }
    }

    public async destroy({ params } : HttpContextContract) {

        const library = await Lib.findOrFail(params.id)

        library.delete()

        return {
            msg : `Livro ${library.book} excluído`,
            data : library
        }
        
    }

    public async update( {params, request} : HttpContextContract) {

        const body = request.body()

        const library = await Lib.findOrFail(params.id)

        if (body.book != null){
        library.book = body.book
        }
        if (body.lib != null){
        library.lib = body.lib
        }
        
        library.person = body.person

        await library.save()

        return {
            data : library
        }

        
        
    }

}
