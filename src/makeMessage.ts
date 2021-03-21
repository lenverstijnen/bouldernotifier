import { format, isToday, parseISO } from "date-fns"
import { config } from "./config"
import { nl } from "date-fns/locale"
import { ITimeslot } from "./convertData"

const checkedDay = () =>
  isToday(config.dateToCheck)
    ? "vandaag"
    : format(config.dateToCheck, "eeee", { locale: nl })

const convertSlotsToString = (availableSlots: ITimeslot[]) => {
  return availableSlots
    .map(
      (slot) =>
        `${format(parseISO(slot.startSlot), "HH:mm")} (${slot.numberOfSpots} ${
          slot.numberOfSpots > 1 ? "plekken" : "plek"
        })`
    )
    .join(" en om ")
}

export const makeMessage = (availableSlots: ITimeslot[]) => {
  return `Er is ${checkedDay()} plek bij Energiehaven, namelijk om ${convertSlotsToString(
    availableSlots
  )}.`
}
