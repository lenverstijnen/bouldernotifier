jest.mock("./config.ts")

import { config } from "./config"
import {
  setNotifies,
  deleteNotify,
  filterUnnotifiedSlots,
  cleanupExpiredNotifies,
} from "./preventDoubleMessages"
import { mockNotifies } from "./__mocks__/mockNotifies"

it("should return null if there are no available slots", () => {
  const result = filterUnnotifiedSlots(null)
  expect(result).toBeNull()
})

it("should return only the unnotified slots", () => {
  setNotifies([mockNotifies[0]])
  const result = filterUnnotifiedSlots(mockNotifies)
  expect(result).toEqual([mockNotifies[1]])
})

it("should return null if there are no unnotified slots", () => {
  setNotifies([mockNotifies[1]])
  const result = filterUnnotifiedSlots(mockNotifies)
  expect(result).toBeNull()
})

it("should match mocknotifies if notify one is deleted", () => {
  deleteNotify(mockNotifies[0])
  deleteNotify(mockNotifies[1])
  const result = filterUnnotifiedSlots(mockNotifies)

  expect(result).toEqual(mockNotifies)
})

it("should cleanup the notifies from the past", () => {
  config.dateToCheck = new Date("2021-02-02T07:01:00.000+01:00")

  setNotifies([mockNotifies[0]])
  const result = filterUnnotifiedSlots(mockNotifies)
  expect(result).toEqual([mockNotifies[1]])

  cleanupExpiredNotifies()

  const result2 = filterUnnotifiedSlots(mockNotifies)
  expect(result2).toEqual(mockNotifies)
})
