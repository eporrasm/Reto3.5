import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('no_identificacion').notNullable()
      table.string('tipo_identificacion', 180).notNullable()
      table.string('nombres', 180).notNullable()
      table.string('apellidos', 180).notNullable()
      table.string('email', 255).notNullable()
      table.string('direccion', 180).notNullable()
      table.string('barrio', 180).notNullable()
      table.string('municipio', 180).notNullable()
      table.string('departamento', 180).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
