import { differenceInMinutes, parseISO } from "date-fns"
import { config } from "./config"
import { ITimeslot } from "./convertData"

const getSlotsWithinXMinutesFromDate = (slots: ITimeslot[], date: Date) => {
  return slots.filter((slot) => {
    const diff = differenceInMinutes(parseISO(slot.startSlot), date)
    return diff <= config.minutesInAdvance && !(diff < 0)
  })
}

export const extractAvailableSlots = (slots: ITimeslot[], now: Date) => {
  const slotsToCheck = getSlotsWithinXMinutesFromDate(slots, now)
  const availableSlots = slotsToCheck.filter((slot) => slot.numberOfSpots > 0)

  return availableSlots.length ? availableSlots : null
}
