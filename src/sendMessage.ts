import TG from "node-telegram-bot-api"

export const sendMessage = (message: string) => {
  const bot = new TG(process.env.API_TOKEN!, {
    polling: true,
  })

  bot.sendMessage(process.env.ID_LEN!, message)
}
