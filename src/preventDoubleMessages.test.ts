jest.mock("./config.ts")

import { config } from "./config"
import {
  setNotifies,
  deleteNotify,
  filterUnnotifiedSlots,
  cleanupNotifiedList,
} from "./preventDoubleMessages"
import {
  mockDaySlots,
  mockNotifies,
  resetPreventDoubleMessageMocks,
} from "./__mocks__/preventDoubleMessageMocks"
import { extractAvailableSlots } from "./extractAvailableSlots"
import { resetConfig } from "./__mocks__/config"

afterEach(() => {
  resetConfig()
  resetPreventDoubleMessageMocks()
})

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

it("should cleanup the expired notifies", () => {
  config.dateToCheck = new Date("2021-02-02T07:01:00.000+01:00")

  setNotifies([mockNotifies[0]])
  const result = filterUnnotifiedSlots(mockNotifies)
  expect(result).toEqual([mockNotifies[1]])

  cleanupNotifiedList(mockDaySlots)

  const result2 = filterUnnotifiedSlots(mockNotifies)
  expect(result2).toEqual(mockNotifies)
})

it("should cleanup the notifies after they are taken", () => {
  const date = new Date("2021-02-02")

  config.dateToCheck = date
  config.minutesInAdvance = 60 * 23

  setNotifies(mockNotifies)

  const availableSlots1 = extractAvailableSlots(mockDaySlots, date)
  const result = filterUnnotifiedSlots(availableSlots1)

  expect(result).toBeNull()

  mockDaySlots[0].numberOfSpots = 0

  cleanupNotifiedList(mockDaySlots)
  const availableSlots2 = extractAvailableSlots(mockDaySlots, date)

  const result2 = filterUnnotifiedSlots(availableSlots2)

  mockDaySlots[0].numberOfSpots = 1

  const availableSlots3 = extractAvailableSlots(mockDaySlots, date)

  const result3 = filterUnnotifiedSlots(availableSlots3)
  expect(result3!.length).toBe(1)
  expect(result3![0].numberOfSpots).toBe(1)
})
