/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import LibsController from 'App/Controllers/Http/LibsController'
import CommandsController from 'App/Controllers/Http/CommandsController'

Route.group( () => {
  Route.get('/', async () => {
    return { hello: 'world', teste : 20}
  })
  
  Route.resource('/library', "LibsController").apiOnly()
  Route.post('/library/add_book', "LibsController.store_book")
  Route.post('/library/add_user', "LibsController.add_user")


  Route.put('/library/take/:id', "CommandsController.take")
  Route.put('/library/return/:id', "CommandsController.return")
  Route.get('/library/search/:library?avaliable', "CommandsController.get_books")

}).prefix('/api')