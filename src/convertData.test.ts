import { mockData } from "./__mocks__/mockData"
import { convertData } from "./convertData"
import { mockConvertedData } from "./__mocks__/mockConvertedData"

it("should convert the data the right way", () => {
  const result = convertData(mockData)

  expect(result).toEqual(mockConvertedData)
})
