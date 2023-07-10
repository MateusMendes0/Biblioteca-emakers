import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Persons extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('person').unique()
      table.integer('book_id').unsigned().references('books.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
