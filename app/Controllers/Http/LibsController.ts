import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Lib from 'App/Models/Lib'

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
}
