interface IToploggerTimeSlot {
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
export interface ITimeslot {
  id: number
  details: string | null
  numberOfSpots: number
  startSlot: string
}

export const convertData = (
  slots: IToploggerTimeSlot[]
): ITimeslot[] | null => {
  if (!slots.length) return null

  return slots.map((slot) => {
    const { spots_booked, spots, start_at, details, id } = slot
    return {
      id,
      details,
      numberOfSpots: spots - spots_booked,
      startSlot: start_at,
    }
  })
}
