import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public title: string
  @column() public author: number
  @column() public editorial: string
  @column() public no_de_paginas: number
  @column() public id_usuario: number
}
