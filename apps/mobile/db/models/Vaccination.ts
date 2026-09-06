import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Vaccination extends Model {
  static table = 'vaccinations'
  static associations = {
    animals: { type: 'belongs_to', key: 'animal_id' }
  } as const

  @field('animal_id') animalId!: string
  @field('disease_target') diseaseTarget!: string
  @field('vaccine_name') vaccineName!: string
  @field('administered_date') administeredDate!: string
  @field('next_due') nextDue?: string
  @field('batch_number') batchNumber?: string
  @field('sync_status') syncStatus!: string
  @field('last_modified') lastModified!: number

  @relation('animals', 'animal_id') animal: any
}
