import { AvailableTimeSlot } from "./extractAvailableSlots"
import {
  setNotify,
  deleteNotify,
  filterUnnotifiedSlots,
  cleanupNotifies,
} from "./preventDoubleMessages"

const mockNotifies: AvailableTimeSlot[] = [
  {
    id: 0,
    details: null,
    numberOfSpots: 1,
    startSlot: "2021-02-02T07:00:00.000+01:00",
  },
  {
    id: 1,
    details: null,
    numberOfSpots: 2,
    startSlot: "2021-02-02T07:00:00.000+01:00",
  },
]

it("should return null if there are no available slots", () => {
  const result = filterUnnotifiedSlots(null)
  expect(result).toBeNull()
})

it("should return only the unnotified slots", () => {
  setNotify(mockNotifies[0])
  const result = filterUnnotifiedSlots(mockNotifies)
  expect(result).toEqual([mockNotifies[1]])
})

it("should return null if there are no unnotified slots", () => {
  setNotify(mockNotifies[1])
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
  const now = new Date("2021-02-02T07:01:00.000+01:00")

  setNotify(mockNotifies[0])
  const result = filterUnnotifiedSlots(mockNotifies)
  expect(result).toEqual([mockNotifies[1]])

  cleanupNotifies(now)

  const result2 = filterUnnotifiedSlots(mockNotifies)
  expect(result2).toEqual(mockNotifies)
})
