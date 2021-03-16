import axios from "axios"
import { format } from "date-fns"
import { notifyAdministrator } from "./sendMessage"
import { config } from "./config"

export const fetchData = async () => {
  const today = format(config.dateToCheck, "yyyy-MM-dd")
  const url = `https://api.toplogger.nu/v1/gyms/11/slots?date=${today}&reservation_area_id=67&slim=true`

  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.log(error)
    notifyAdministrator(`(Error on fetch): ${error}`)
  }
}
