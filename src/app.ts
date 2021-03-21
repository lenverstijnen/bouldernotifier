import dotenv from "dotenv"
dotenv.config()
import { sendMessage, notifyAdministrator } from "./sendMessage"
import { extractAvailableSlots } from "./extractAvailableSlots"
import { fetchData } from "./fetchData"
import {
  filterUnnotifiedSlots,
  setNotifies,
  cleanupNotifiedList,
} from "./preventDoubleMessages"
import { makeMessage } from "./makeMessage"
import cron from "node-cron"
import { format } from "date-fns"
import express from "express"
import { config } from "./config"
const app = express()

process.on("uncaughtException", (error) => {
  console.log(error)
  notifyAdministrator(`(uncaughtHandler):: ${error}`)
})

const formatDate = (date: Date) => format(date, "dd-MM-yyyy HH:mm")

const minutesToHours = (minutes: number) => minutes / 60

const cronLogMessage = () =>
  `Checking available spots for (${formatDate(
    config.dateToCheck
  )}, ${minutesToHours(config.minutesInAdvance)} hours in advance)`

cron.schedule("*/10 * * * * *", async () => {
  console.log(cronLogMessage())

  const slots = await fetchData()
  if (!slots?.length) return

  cleanupNotifiedList(slots)

  const availableSlots = extractAvailableSlots(slots, config.dateToCheck)
  const unnotifiedSlots = filterUnnotifiedSlots(availableSlots)
  if (!unnotifiedSlots) return

  const message = makeMessage(unnotifiedSlots)
  sendMessage(message)

  setNotifies(unnotifiedSlots)
})

// Express is necessary for heroku to bind the port.
app.listen(process.env.PORT, () => {
  const message = `App (re)started (${formatDate(new Date())})`
  sendMessage(message)
  console.log(message)
})
