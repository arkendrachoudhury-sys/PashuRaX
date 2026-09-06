import { Model } from '@nozbe/watermelondb'
import { field, relation, children, date } from '@nozbe/watermelondb/decorators'

export default class Animal extends Model {
  static table = 'animals'
  static associations = {
    users: { type: 'belongs_to', key: 'owner_id' },
    health_records: { type: 'has_many', foreignKey: 'animal_id' },
  } as const

  @field('tag_number') tagNumber!: string
  @field('species') species!: string
  @field('breed') breed?: string
  @field('birth_date') birthDate!: string
  @field('sex') sex!: string
  @field('status') status!: string
  @field('owner_id') ownerId!: string
  @date('created_at') createdAt!: Date
  @date('updated_at') updatedAt!: Date
  @field('sync_status') syncStatus!: string
  @field('last_modified') lastModified!: number

  @relation('users', 'owner_id') owner: any
  @children('health_records') healthRecords: any
}
