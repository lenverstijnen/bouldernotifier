import dotenv from "dotenv"
dotenv.config()
import { sendMessage, notifyAdministrator } from "./sendMessage"
import { extractAvailableSlots } from "./extractAvailableSlots"
import { fetchData } from "./fetchData"
import {
  filterUnnotifiedSlots,
  setNotify,
  cleanupNotifies,
} from "./preventDoubleMessages"
import { makeMessage } from "./makeMessage"
import cron from "node-cron"
import { format } from "date-fns"

process.on("uncaughtException", (error) => {
  notifyAdministrator(`${error}`)
})

const formattedDate = format(new Date(), "dd-MM-yyyy HH:mm")

cron.schedule("* * * * *", async () => {
  console.log(`cron runs (${formattedDate})`)

  const slots = await fetchData()
  const availableSlots = extractAvailableSlots(slots, new Date())
  const unnotifiedSlots = filterUnnotifiedSlots(availableSlots)
  if (!unnotifiedSlots) return

  const message = makeMessage(unnotifiedSlots)
  sendMessage(message)

  unnotifiedSlots.forEach((slot) => setNotify(slot))
  cleanupNotifies(new Date())
})

const message = `App started (${formattedDate})`
notifyAdministrator(message)
console.log(message)
