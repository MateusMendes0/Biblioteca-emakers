import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class Person extends BaseModel {
  @column( { isPrimary: true })
  public id: number

  @column()
  public person : string

  @hasMany(() => Book)
  public book_id : HasMany<typeof Book>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
