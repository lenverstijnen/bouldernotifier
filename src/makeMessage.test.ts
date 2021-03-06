jest.mock("./config.ts")

import { parseISO } from "date-fns"
import { extractAvailableSlots } from "./extractAvailableSlots"
import { mockConvertedData } from "./__mocks__/mockConvertedData"
import { makeMessage } from "./makeMessage"
import { config } from "./config"
import { resetConfig } from "./__mocks__/config"

afterEach(resetConfig)

it("Should return the correct message for 2 spots", () => {
  config.dateToCheck = new Date()

  const message =
    "Er is vandaag plek bij Energiehaven, namelijk om 07:30 (2 plekken) en om 08:15 (1 plek)."

  const date = parseISO("2021-02-02T07:00:00.000+01:00")
  const slots = extractAvailableSlots(mockConvertedData, date)
  const result = makeMessage(slots!)

  expect(result).toBe(message)
})

it("Should return the correct message for 1 spot", () => {
  config.dateToCheck = new Date("2021-03-15")
  const message =
    "Er is maandag plek bij Energiehaven, namelijk om 07:30 (2 plekken)."

  const date = parseISO("2021-02-02T07:00:00.000+01:00")
  const slots = extractAvailableSlots(mockConvertedData, date)
  slots?.pop()
  const result = makeMessage(slots!)

  expect(result).toBe(message)
})

it("Should return the correct message for 4 spots", () => {
  config.dateToCheck = new Date("2021-03-17")

  const message =
    "Er is woensdag plek bij Energiehaven, namelijk om 18:15 (1 plek) en om 18:30 (1 plek) en om 19:00 (1 plek) en om 19:30 (3 plekken)."

  const date = parseISO("2021-02-02T18:15:00.000+01:00")
  const slots = extractAvailableSlots(mockConvertedData, date)
  const result = makeMessage(slots!)

  expect(result).toBe(message)
})
