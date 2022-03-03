import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contests extends BaseSchema {
  protected tableName = 'contests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('image_url')
      table.integer('user_id')
  

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
