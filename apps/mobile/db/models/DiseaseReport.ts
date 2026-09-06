import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class DiseaseReport extends Model {
  static table = 'disease_reports'
  static associations = {
    animals: { type: 'belongs_to', key: 'animal_id' }
  } as const

  @field('animal_id') animalId!: string
  @field('disease_id') diseaseId!: string
  @field('status') status!: string
  @field('severity') severity!: string
  @field('reported_by') reportedBy!: string
  @field('reported_at') reportedAt!: string
  @field('sync_status') syncStatus!: string
  @field('last_modified') lastModified!: number

  @relation('animals', 'animal_id') animal: any
}
