import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Check secure headers', async ({ request }) => {
  const response = await request.get('/')
  const headers = response.headers()
  expect(headers).toMatchObject({
    'strict-transport-security': 'max-age=63072000',
    'x-frame-options': 'deny',
    'x-download-options': 'noopen',
    'x-content-type-options': 'nosniff',
    'x-xss-protection': '1',
  })
})
