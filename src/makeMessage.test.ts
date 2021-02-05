import { parseISO } from "date-fns"
import { extractAvailableSlots } from "./extractAvailableSlots"
import { mockData } from "./mocks/mockData"
import { makeMessage } from "./makeMessage"

it("Should return the correct message for 2 spots", () => {
  const message =
    "Er zijn 2 plekken beschikbaar bij Energiehaven, namelijk om 07:30 (2 plekken) en om 08:15 (1 plek)."

  const date = parseISO("2021-02-02T07:00:00.000+01:00")
  const slots = extractAvailableSlots(mockData, date)
  const result = makeMessage(slots!)

  expect(result).toBe(message)
})

it("Should return the correct message for 1 spot", () => {
  const message =
    "Er is 1 plek beschikbaar bij Energiehaven, namelijk om 07:30 (2 plekken)."

  const date = parseISO("2021-02-02T07:00:00.000+01:00")
  const slots = extractAvailableSlots(mockData, date)
  slots?.pop()
  const result = makeMessage(slots!)

  expect(result).toBe(message)
})

it("Should return the correct message for 4 spots", () => {
  const message =
    "Er zijn 4 plekken beschikbaar bij Energiehaven, namelijk om 18:15 (1 plek) en om 18:30 (1 plek) en om 19:00 (1 plek) en om 19:30 (3 plekken)."

  const date = parseISO("2021-02-02T18:15:00.000+01:00")
  const slots = extractAvailableSlots(mockData, date)
  const result = makeMessage(slots!)

  expect(result).toBe(message)
})
