import TG from "node-telegram-bot-api"

const bot = new TG(process.env.API_TOKEN!)

const sendToSjoerd = (message: string) =>
  bot.sendMessage(process.env.ID_SJOERD!, message)

const sendToSjoerdWithDelay = (delay: number, message: string) => {
  if (!delay) sendToSjoerd(message)

  setTimeout(() => sendToSjoerd(message), delay)
}

export const sendMessage = (message: string) => {
  bot.sendMessage(process.env.ID_LEN!, message)
  bot.sendMessage(process.env.ID_MARLOES!, message)

  // sendToSjoerdWithDelay(0, message)

  console.log("Message sent: ", message)
}

// Error Handling
export const notifyAdministrator = (message: string) => {
  const computedMessage = `DevNotify from bouldernotifier:  ${message}`

  console.log(computedMessage)
  bot.sendMessage(process.env.ID_LEN!, computedMessage)
}

bot.on("error", (error) => {
  console.log(error)
  notifyAdministrator(`An error occured when sending the message: ${error}`)
})
