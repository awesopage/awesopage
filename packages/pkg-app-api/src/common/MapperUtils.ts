export const mapErrorToString = (err: Error): string => {
  return err.stack ?? err.message
}

export const mapTimestampToString = (timestamp: Date): string => {
  return timestamp.toISOString()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapValueToString = (value: any): string => {
  return `${value}`
}
