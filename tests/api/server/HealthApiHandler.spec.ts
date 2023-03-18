import { getHealthStatusApiConfig } from 'pkg-app-shared/src/server/HealthApiConfig'
import type { HealthStatusDTO } from 'pkg-app-shared/src/server/HealthStatusDTO'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'

const getHealthStatus = createTestApiRequest(getHealthStatusApiConfig)

test.describe(getHealthStatusApiConfig.name, () => {
  test.describe('given working system', () => {
    test('should return correct status', async ({ request }) => {
      const getHealthStatusResponse = await getHealthStatus(request)
      const healthStatus = await getHealthStatusResponse.json()

      const expectedHealthStatus: HealthStatusDTO = {
        ok: true,
        database: true,
      }

      expect(healthStatus).toEqual(expectedHealthStatus)
    })
  })
})
