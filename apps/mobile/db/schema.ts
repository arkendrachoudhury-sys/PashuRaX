import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'phone', type: 'string', isOptional: true },
        { name: 'jurisdiction', type: 'string', isOptional: true },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'animals',
      columns: [
        { name: 'tag_number', type: 'string' },
        { name: 'species', type: 'string' },
        { name: 'breed', type: 'string', isOptional: true },
        { name: 'birth_date', type: 'string' },
        { name: 'sex', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'owner_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'herds',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'owner_id', type: 'string', isIndexed: true },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'health_records',
      columns: [
        { name: 'animal_id', type: 'string', isIndexed: true },
        { name: 'date', type: 'string' },
        { name: 'symptoms', type: 'string' },
        { name: 'temperature', type: 'number' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'recorded_by', type: 'string' },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'vaccinations',
      columns: [
        { name: 'animal_id', type: 'string', isIndexed: true },
        { name: 'disease_target', type: 'string' },
        { name: 'vaccine_name', type: 'string' },
        { name: 'administered_date', type: 'string' },
        { name: 'next_due', type: 'string', isOptional: true },
        { name: 'batch_number', type: 'string', isOptional: true },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'disease_reports',
      columns: [
        { name: 'animal_id', type: 'string', isIndexed: true },
        { name: 'disease_id', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'severity', type: 'string' },
        { name: 'reported_by', type: 'string' },
        { name: 'reported_at', type: 'string' },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'samples',
      columns: [
        { name: 'animal_id', type: 'string', isIndexed: true },
        { name: 'sample_type', type: 'string' },
        { name: 'barcode', type: 'string' },
        { name: 'collected_at', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'alerts',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'severity', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'sync_status', type: 'string' },
        { name: 'last_modified', type: 'number' }
      ]
    })
  ]
})
