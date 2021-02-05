import { checkSlot } from "./checkSlot"
import { mockData } from "./mocks/mockData"

it("should count the slots properly", () => {
  // 0 => full
  // 1 => 2 spots
  // 2 => 1 spot
  // 3 => 3 spots
  // 4 => full

  const zero = checkSlot(mockData[0])
  const one = checkSlot(mockData[1])
  const three = checkSlot(mockData[3])

  expect(zero).toBeNull()
  expect(one?.numberOfSpots).toBe(2)
  expect(three?.numberOfSpots).toBe(3)
})
