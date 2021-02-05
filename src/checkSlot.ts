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

export const checkSlot = (slot: TopLoggerTimeSlot) => {
  const { spots_booked, spots, start_at, details } = slot

  if (spots_booked < spots) {
    return {
      numberOfSpots: spots - spots_booked,
      startSlot: start_at,
      details: details,
    }
  } else return null
}
