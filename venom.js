import { create } from "venom-bot";
import { Configuration, OpenAIApi } from "openai"

const prompt = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Where was it played?"}
]

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

const openai = new OpenAIApi(configuration);

export const startClient = function() {
  return create({
    session: "Chat-GPT",
    multidevice: true
  });
};

export const start = function(client) {
  client.onAnyMessage(async message => {
    if (message && message.text && message.text.startsWith("/bot")) {

      prompt.push({})

      let botResponse = ""
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "Você é um assistente útil."}
        ].concat(prompt)
      })
      response.data.choices.forEach(({text}) => { botResponse += text })
      client.sendText(message.from === config.BOT_NUMBER ? message.to : message.from, response)
    }
  });
};


