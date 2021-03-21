import { isAfter, parseISO } from "date-fns"
import isEqual from "lodash.isequal"
import { config } from "./config"
import { ITimeslot } from "./convertData"

let notified: ITimeslot[] = []

const isNotified = (slot: ITimeslot) =>
  notified.some((notify) => isEqual(notify, slot))

const removeExpiredSlots = (slots: ITimeslot[]) =>
  notified.filter(
    (slot) => !isAfter(config.dateToCheck, parseISO(slot.startSlot))
  )

const removeTakenSlots = (notified: ITimeslot[], slots: ITimeslot[]) =>
  notified.filter(({ id }) => {
    const slot = slots.find((slot) => slot.id === id)
    return slot?.numberOfSpots !== 0
  })

export const deleteNotify = (slot: ITimeslot) => {
  const newNotified = notified.filter((notify) => !isEqual(notify, slot))
  notified = newNotified
}

export const setNotifies = (slots: ITimeslot[]) =>
  slots.forEach((slot) => notified.push(slot))

export const cleanupExpiredNotifies = (slots: ITimeslot[]) => {
  let newNotified = removeExpiredSlots(slots)
  newNotified = removeTakenSlots(newNotified, slots)

  notified = newNotified
}

export const filterUnnotifiedSlots = (slots: ITimeslot[] | null) => {
  if (!slots) return null
  const filtered = slots.filter((slot) => !isNotified(slot))
  return filtered.length ? filtered : null
}
