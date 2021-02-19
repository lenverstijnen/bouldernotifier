import TG from "node-telegram-bot-api"

const bot = new TG(process.env.API_TOKEN!, { polling: true })

bot.on("polling_error", (error) => {
  console.log(error)
  notifyAdministrator(`Polling Error: ${error}`)
})

export const notifyAdministrator = (message: string) => {
  const computedMessage = `DevNotify from bouldernotifier:  ${message}`

  console.log(computedMessage)
  bot.sendMessage(process.env.ID_LEN!, computedMessage)
}

export const sendMessage = (message: string) => {
  bot.sendMessage(process.env.ID_LEN!, message)
  bot.sendMessage(process.env.ID_MARLOES!, message)
  setTimeout(() => bot.sendMessage(process.env.ID_SJOERD!, message), 1000 * 60)
  console.log("Message sent: ", message)

  bot.on("error", (error) => {
    console.log(error)
    notifyAdministrator(`Error in sendMessage: ${error}`)
  })
}
