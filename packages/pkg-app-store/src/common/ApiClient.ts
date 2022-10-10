import axios from 'axios'

import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

assertDefined(process.env.NEXT_PUBLIC_APP_BASE_URL, 'NEXT_PUBLIC_APP_BASE_URL')

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`,
})
