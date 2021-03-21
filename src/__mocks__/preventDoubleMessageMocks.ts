import { ITimeslot } from "../convertData"

export let mockNotifies: ITimeslot[] = [
  {
    id: 0,
    details: null,
    numberOfSpots: 2,
    startSlot: "2021-02-02T07:00:00.000+01:00",
  },
  {
    id: 1,
    details: null,
    numberOfSpots: 1,
    startSlot: "2021-02-02T07:15:00.000+01:00",
  },
]

export let mockDaySlots = [
  {
    id: 0,
    details: null,
    numberOfSpots: 2,
    startSlot: "2021-02-02T07:00:00.000+01:00",
  },
  {
    id: 1,
    details: null,
    numberOfSpots: 1,
    startSlot: "2021-02-02T07:15:00.000+01:00",
  },
  {
    id: 2,
    details: null,
    numberOfSpots: 0,
    startSlot: "2021-02-02T07:30:00.000+01:00",
  },
  {
    id: 3,
    details: null,
    numberOfSpots: 0,
    startSlot: "2021-02-02T07:45:00.000+01:00",
  },
  {
    id: 4,
    details: null,
    numberOfSpots: 0,
    startSlot: "2021-02-02T08:00:00.000+01:00",
  },
]

export const resetPreventDoubleMessageMocks = () => {
  mockDaySlots = [
    {
      id: 0,
      details: null,
      numberOfSpots: 2,
      startSlot: "2021-02-02T07:00:00.000+01:00",
    },
    {
      id: 1,
      details: null,
      numberOfSpots: 1,
      startSlot: "2021-02-02T07:15:00.000+01:00",
    },
    {
      id: 2,
      details: null,
      numberOfSpots: 0,
      startSlot: "2021-02-02T07:30:00.000+01:00",
    },
    {
      id: 3,
      details: null,
      numberOfSpots: 0,
      startSlot: "2021-02-02T07:45:00.000+01:00",
    },
    {
      id: 4,
      details: null,
      numberOfSpots: 0,
      startSlot: "2021-02-02T08:00:00.000+01:00",
    },
  ]
  mockNotifies = [
    {
      id: 0,
      details: null,
      numberOfSpots: 2,
      startSlot: "2021-02-02T07:00:00.000+01:00",
    },
    {
      id: 1,
      details: null,
      numberOfSpots: 1,
      startSlot: "2021-02-02T07:15:00.000+01:00",
    },
  ]
}
