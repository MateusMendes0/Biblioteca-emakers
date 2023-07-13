import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Lib from 'App/Models/Lib'
import Book from 'App/Models/Book'
import Person from 'App/Models/Person'

import bodyParserConfig from 'Config/bodyparser'

export default class LibsController {
    public async store({request,response} : HttpContextContract){

        
        const body = request.body()
        const library = await Lib.create({library:body.library})
        await library.save()


        response.status(201)
        
    return {
        msg : 'Criado com sucesso',
        data : library
    }

    }

    public async add_user({request,response} : HttpContextContract){

        const body = request.body()

        const user = await Person.create({person:body.person})
        await user.save()

        response.status(201)
        
    return {
        msg : 'Criado com sucesso',
        data : user
    }

    }

    public async index(){


        const library = await Lib.all()
        return{
            data : library
        }
    }

    public async show({ params } : HttpContextContract){

        const library = await Lib.findByOrFail('id', params.id)

        return {
            data : library
        }
    }

    public async destroy({ params } : HttpContextContract) {

        const library = await Lib.findByOrFail('id', params.id)

        await library.delete()

        return {
            msg : `Biblioteca ${library.library} excluída`,
        }
        
    }

   public async update( {params, request} : HttpContextContract) {

        const body = request.body()

        const library = await Lib.findOrFail(params.id)
        
        library.library = body.library

        await library.save()

        return {
            data : library
        } 
        
    }

}
