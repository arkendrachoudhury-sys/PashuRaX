import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class HealthRecord extends Model {
  static table = 'health_records'
  static associations = {
    animals: { type: 'belongs_to', key: 'animal_id' }
  } as const

  @field('animal_id') animalId!: string
  @field('date') date!: string
  @field('symptoms') symptoms!: string
  @field('temperature') temperature!: number
  @field('notes') notes?: string
  @field('recorded_by') recordedBy!: string
  @field('sync_status') syncStatus!: string
  @field('last_modified') lastModified!: number

  @relation('animals', 'animal_id') animal: any
}
