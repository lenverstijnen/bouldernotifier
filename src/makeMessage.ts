import { format, isToday, parseISO } from "date-fns"
import { AvailableTimeSlot } from "./extractAvailableSlots"
import { config } from "./config"
import { nl } from "date-fns/locale"

const checkedDay = () =>
  isToday(config.dateToCheck)
    ? "vandaag"
    : format(config.dateToCheck, "eeee", { locale: nl })

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
  return `Er is ${checkedDay()} plek bij Energiehaven, namelijk om ${extractTimes(
    availableSlots
  )}.`
}
