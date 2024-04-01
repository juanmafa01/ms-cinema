import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, ManyToMany, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector'
import Seat from './Seat'
import Movie from './Movie'

export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location:string
  
  @column()
  public capacity:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Projector,{
    foreignKey: 'theater_id',
  })
  public projector: HasOne<typeof Projector>

  @hasMany(() => Seat, {
    foreignKey: 'theater_id',
  })
  public seats: HasMany<typeof Seat>

  @manyToMany(() => Movie, {
    pivotTable: 'screenings',
    pivotForeignKey: 'theater_id',
    pivotRelatedForeignKey: 'movie_id',
    pivotColumns: ['date']
  })
  public movies: ManyToMany<typeof Movie>
}
