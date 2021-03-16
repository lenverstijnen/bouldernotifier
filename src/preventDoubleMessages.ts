jest.mock("./config.ts")
import { isAfter, parseISO } from "date-fns"
import isEqual from "lodash.isequal"
import { config } from "./config"
import { IAvailableSlot } from "./extractAvailableSlots"

let notified: IAvailableSlot[] = []

const isNotified = (slot: IAvailableSlot) =>
  notified.some((notify) => isEqual(notify, slot))

export const deleteNotify = (slot: IAvailableSlot) => {
  const newNotified = notified.filter((notify) => !isEqual(notify, slot))
  notified = newNotified
}

export const setNotifies = (slots: IAvailableSlot[]) =>
  slots.forEach((slot) => notified.push(slot))

export const cleanupExpiredNotifies = () => {
  const newNotified = notified.filter(
    (slot) => !isAfter(config.dateToCheck, parseISO(slot.startSlot))
  )
  notified = newNotified
}

export const filterUnnotifiedSlots = (slots: IAvailableSlot[] | null) => {
  if (!slots) return null
  const filtered = slots.filter((slot) => !isNotified(slot))
  return filtered.length ? filtered : null
}
