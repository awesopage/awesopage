/* eslint-disable no-null/no-null */

import type { Prisma } from 'pkg-app-model/client'

export type DbClient = Prisma.TransactionClient

export const DB_NULL_VALUE = null

export const maybe = <T extends object>(record: T | null): T | undefined => {
  return record === DB_NULL_VALUE ? undefined : record
}
