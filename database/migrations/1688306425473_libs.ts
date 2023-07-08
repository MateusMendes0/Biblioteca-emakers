import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Libraries extends BaseSchema {
  protected tableName = 'libs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('library').primary()
      table.increments('id')

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
