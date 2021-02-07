import { format, parseISO } from "date-fns"
import { AvailableTimeSlot } from "./extractAvailableSlots"

const extractTimes = (availableSlots: AvailableTimeSlot[]) => {
  return availableSlots
    .map(
      (slot) =>
        `${format(parseISO(slot.startSlot), "HH:mm")} (${slot.numberOfSpots} ${
          slot.numberOfSpots > 1 ? "plekken" : "plek"
        })`
    )
    .join(" en om ")
}

export const makeMessage = (availableSlots: AvailableTimeSlot[]) => {
  return `Er is plek bij Energiehaven, namelijk om ${extractTimes(
    availableSlots
  )}.`
}
