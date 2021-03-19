import { format, isToday, parseISO } from "date-fns"
import { IAvailableSlot } from "./extractAvailableSlots"
import { config } from "./config"
import { nl } from "date-fns/locale"

const checkedDay = () =>
  isToday(config.dateToCheck)
    ? "vandaag"
    : format(config.dateToCheck, "eeee", { locale: nl })

const convertSlotsToString = (availableSlots: IAvailableSlot[]) => {
  return availableSlots
    .map(
      (slot) =>
        `${format(parseISO(slot.startSlot), "HH:mm")} (${slot.numberOfSpots} ${
          slot.numberOfSpots > 1 ? "plekken" : "plek"
        })`
    )
    .join(" en om ")
}

export const makeMessage = (availableSlots: IAvailableSlot[]) => {
  return `Er is ${checkedDay()} plek bij Energiehaven, namelijk om ${convertSlotsToString(
    availableSlots
  )}.`
}
