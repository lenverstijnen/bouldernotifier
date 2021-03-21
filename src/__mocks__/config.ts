export const config = {
  dateToCheck: new Date(),
  minutesInAdvance: 75,
}

export const resetConfig = () => {
  config.dateToCheck = new Date()
  config.minutesInAdvance = 75
}
