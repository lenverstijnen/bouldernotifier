import isEqual from "lodash.isequal"
import { AvailableTimeSlot } from "./extractAvailableSlots"

let notified: AvailableTimeSlot[] = []

const isNotified = (slot: AvailableTimeSlot) =>
  notified.some((notify) => isEqual(notify, slot))

export const deleteNotify = (slot: AvailableTimeSlot) => {
  const newNotified = notified.filter((notify) => !isEqual(notify, slot))
  notified = newNotified
}

export const setNotify = (slot: AvailableTimeSlot) => notified.push(slot)

export const filterUnnotifiedSlots = (slots: AvailableTimeSlot[] | null) => {
  if (!slots) return null
  const filtered = slots.filter((slot) => !isNotified(slot))
  return filtered.length ? filtered : null
}
