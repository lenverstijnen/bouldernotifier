import { differenceInMinutes, parseISO } from "date-fns"

interface TopLoggerTimeSlot {
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

export interface AvailableTimeSlot {
  id: number
  details: string | null
  numberOfSpots: number
  startSlot: string
}

const checkSlot = (slot: TopLoggerTimeSlot) => {
  const { spots_booked, spots, start_at, details, id } = slot

  if (spots_booked < spots) {
    return {
      id,
      details,
      numberOfSpots: spots - spots_booked,
      startSlot: start_at,
    }
  } else return null
}

const getSlotsWithin75MinutesFromNow = (
  slots: TopLoggerTimeSlot[],
  now: Date
) => {
  return slots.filter((slot) => {
    const diff = differenceInMinutes(parseISO(slot.start_at), now)
    return diff <= 75 && !(diff < 0)
  })
}

export const extractAvailableSlots = (
  slots: TopLoggerTimeSlot[],
  now: Date
) => {
  const availableSlots: AvailableTimeSlot[] = []

  const slotsInRange = getSlotsWithin75MinutesFromNow(slots, now)
  slotsInRange.forEach((slot) => {
    const available = checkSlot(slot)
    if (available) availableSlots.push(available)
    else return
  })

  return availableSlots.length ? availableSlots : null
}
