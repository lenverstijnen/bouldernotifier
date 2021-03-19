jest.mock("./config.ts")

import { parseISO } from "date-fns"
import { extractAvailableSlots } from "./extractAvailableSlots"
import { mockConvertedData } from "./__mocks__/mockConvertedData"

it("Should return slot 173631 and 173634 if dateTime is 2021-02-02T07:00:00.000+01:00", () => {
  const date = parseISO("2021-02-02T07:00:00.000+01:00")
  const result = extractAvailableSlots(mockConvertedData, date)

  expect(result?.length).toBe(2)
  expect(result![0].id).toBe(173631)
  expect(result![1].id).toBe(173634)
})

it("Should return slot 174043 and 174044 and 174046 and 174048 if dateTime is 2021-02-02T18:15:00.000+01:00", () => {
  const date = parseISO("2021-02-02T18:15:00.000+01:00")
  const result = extractAvailableSlots(mockConvertedData, date)

  expect(result?.length).toBe(4)
  expect(result![0].id).toBe(174043)
  expect(result![1].id).toBe(174044)
  expect(result![2].id).toBe(174046)
  expect(result![3].id).toBe(174048)
})

it("Should return null if dateTime is 2021-02-02T16:45:00.000+01:00", () => {
  const date = parseISO("2021-02-02T16:45:00.000+01:00")
  const result = extractAvailableSlots(mockConvertedData, date)

  expect(result).toBeNull()
})
