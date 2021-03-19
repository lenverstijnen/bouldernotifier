import { differenceInMinutes, parseISO } from "date-fns"
import { config } from "./config"
interface ITimeSlot {
  id: number
  reservation_area_id: number
  start_at: string
  end_at: string
  checkin_end_at: string
  spots: number
  spots_booked: number
  details: string | null
  require_client_number: boolean
  live: boolean
  require_password: boolean
}

export interface IAvailableSlot {
  id: number
  details: string | null
  numberOfSpots: number
  startSlot: string
}

const isAvailable = (slot: ITimeSlot) => {
  const { spots_booked, spots, start_at, details, id } = slot

  const spotsAvailable = spots_booked < spots

  if (spotsAvailable) {
    return {
      id,
      details,
      numberOfSpots: spots - spots_booked,
      startSlot: start_at,
    }
  } else return null
}

const getSlotsWithinXMinutesFromDate = (slots: ITimeSlot[], date: Date) => {
  return slots.filter((slot) => {
    const diff = differenceInMinutes(parseISO(slot.start_at), date)
    return diff <= config.minutesInAdvance && !(diff < 0)
  })
}

export const extractAvailableSlots = (slots: ITimeSlot[], now: Date) => {
  const availableSlots: IAvailableSlot[] = []

  const slotsToCheck = getSlotsWithinXMinutesFromDate(slots, now)
  slotsToCheck.forEach((slot) => {
    const available = isAvailable(slot)
    if (available) availableSlots.push(available)
    else return
  })

  return availableSlots.length ? availableSlots : null
}
