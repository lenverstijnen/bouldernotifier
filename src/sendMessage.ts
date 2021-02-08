import TG from "node-telegram-bot-api"

const bot = new TG(process.env.API_TOKEN!)

export const sendMessage = (message: string) => {
  try {
    bot.sendMessage(process.env.ID_LEN!, message)
    bot.sendMessage(process.env.ID_SJOERD!, message)
    bot.sendMessage(process.env.ID_MARLOES!, message)
    console.log("Message sent: ", message)
  } catch (error) {
    notifyAdministrator(`${error}`)
  }
}

export const notifyAdministrator = (message: string) => {
  const computedMessage = `DevNotify from bouldernotifier:  ${message}`

  bot.sendMessage(process.env.ID_LEN!, computedMessage)
  console.log(computedMessage)
}
