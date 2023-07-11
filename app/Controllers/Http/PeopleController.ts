import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Request, Response } from '@adonisjs/core/build/standalone'

import Lib from 'App/Models/Lib'
import Book from 'App/Models/Book'
import bodyParserConfig from 'Config/bodyparser'
import Person from 'App/Models/Person'

export default class PeopleController {

        public async store({request,response} : HttpContextContract){
    
            const body = request.body()
    
            const person = await Person.create({person:body.person})
            await person.save()
    
            response.status(201)
            
        return {
            msg : 'Criado com sucesso',
            data : person
        }
    
        }
    
        public async index(){
            
            const person = await Person.all()
            return{
                data : person
            }
        }
    
        public async show({ params } : HttpContextContract) {
    
            const person = await Person.findByOrFail("id", params.id)
    
            return {
                data : person
            }
            
        }
        
        public async destroy({ params } : HttpContextContract) {
    
            const person = await Person.findByOrFail('id', params.id)
    
            await person.delete()
    
            return {
                msg : `Pessoa ${person.person} ID : ${person.id} excluído`,
            }
            
        }
        public async update( {params, request} : HttpContextContract) {

            const body = request.body()
    
            const person = await Person.findOrFail(params.id)
            
            person.person = body.person
    
            await person.save()
    
            return {
                data : person
            } 
            
        }
    }
