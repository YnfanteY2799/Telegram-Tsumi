import { getRandomCode } from "nhentai-websrcrapping-api";
import { Telegraf } from "telegraf";

console.log("Starting bot server!");

const bot = new Telegraf(process.env["TG_Key"] ?? "2096102290:AAGwq1YNE2q1nVlqD9j2Q4qK0rJokrrHLV8");

bot.start((ctx) => {
  const { message } = ctx;
  ctx.reply(
    `Hello ${message.from.first_name} ${message.from.last_name}, I'm Tsumi, How may i help you today ? \n if you want to know what can i do please type /help`
  );
});

bot.command("random", async (ctx) => {
  ctx.reply("Hmmm give me 1 second!");
  ctx.reply("Hope this doujin is good for you!");

  const { name, artists, categories, characters, code, groups, languague, parodies, tags } = await getRandomCode();

  ctx.reply(
    `Title: ${name} \n 
     Code: ${code} \n 
     Artist: ${artists} \n 
     Tags: ${tags.join(" ")} \n
     Categories: ${categories.join(" ")} \n 
     Characters: ${characters.join(" ")} \n
     Groups: ${groups.join(" ")} \n
     Language: ${languague.join(" ")} \n
     Parodies: ${parodies.join(" ")} \n
     `
  );
});

bot.launch();
