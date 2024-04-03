import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater'
import Screening from './Screening'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public duration:number

  @column()
  public year:Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Screening,{
    foreignKey: 'movie_id'
  })
  public screenings: HasMany<typeof Screening>

  @manyToMany(() => Theater, {
    pivotTable: 'screenings',
    pivotForeignKey: 'movie_id',
    pivotRelatedForeignKey: 'theater_id',
    pivotColumns: ['date']
  })
  public theaters: ManyToMany<typeof Theater>
}
