import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("title", 200).notNullable();
      table.integer("author", 200).notNullable();
      table.string("editorial", 200).notNullable();
      table.integer("no_de_paginas", 200).notNullable();
      table.integer("id_usuario", 200).notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
