import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './index' // Assuming database is exported from an index file or you configure it
import api from '../services/api'

export async function syncData() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const response = await api.get(`/api/v1/sync/pull?last_pulled_at=${lastPulledAt || 0}`)
      const { changes, timestamp } = response.data
      return { changes, timestamp }
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      await api.post(`/api/v1/sync/push`, { changes, last_pulled_at: lastPulledAt })
    },
  })
}
