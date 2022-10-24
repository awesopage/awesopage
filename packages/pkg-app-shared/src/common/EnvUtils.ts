export const getProfiles = (): string[] => {
  return process.env.APP_PROFILES ? process.env.APP_PROFILES.split(',') : []
}
