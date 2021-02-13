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
import express from "express"
const app = express()

process.on("uncaughtException", (error) => {
  console.log(error)
  notifyAdministrator(`(uncaughtHandler):: ${error}`)
})

const formatDate = () => format(new Date(), "dd-MM-yyyy HH:mm")

cron.schedule("0-59/1 8-20 * * *", async () => {
  console.log(`cron runs (${formatDate()})`)

  const slots = await fetchData()
  const availableSlots = extractAvailableSlots(slots, new Date())
  const unnotifiedSlots = filterUnnotifiedSlots(availableSlots)
  if (!unnotifiedSlots) return

  const message = makeMessage(unnotifiedSlots)
  sendMessage(message)

  unnotifiedSlots.forEach((slot) => setNotify(slot))
  cleanupNotifies(new Date())
})

// Heroku needs to bind the port
app.listen(process.env.PORT, () => {
  const message = `App started (${formatDate()})`
  sendMessage(message)
  console.log(message)
})
