import wretch from 'wretch'

import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

assertDefined(process.env.NEXT_PUBLIC_APP_BASE_URL, 'NEXT_PUBLIC_APP_BASE_URL')

export const apiClient = wretch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`)
