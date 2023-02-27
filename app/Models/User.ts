import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'
import Perfil from './Perfil'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column() public no_identificacion: number
  @column() public tipo_identificacion: string
  @column() public nombres : string
  @column() public apellidos : string
  @column() public email: string
  @column() public direccion : string
  @column() public barrio : string
  @column() public municipio : string
  @column() public departamento : string
  @column({ serializeAs: null }) public password: string
  @column() public rememberMeToken?: string
  //relacion 1:1 con Perfil
  @hasOne(() => Perfil)
  public perfil: HasOne<typeof Perfil>
  //relacion 1:n con Book
  @hasMany(() => Book)
  public books: HasMany<typeof Book>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
