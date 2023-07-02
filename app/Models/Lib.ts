import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Lib extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public lib : string

  @column()
  public book : string

  @column()
  public person : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
