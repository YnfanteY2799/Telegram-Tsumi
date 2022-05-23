const {
  getCodedDoujin,
  getRandomCode,
  getMainPageContentPopular,
} = require("nhentai-websrcrapping-api");
const { Telegraf } = require("telegraf");

require("dotenv").config({ path: __dirname + "/.env" });

console.log(".... starting Nii-sama");

const bot = new Telegraf(process.env["TG_Key"]);

bot.start((ctx) => {
  let {
    message: {
      from: { first_name, last_name },
    },
  } = ctx;
  ctx.reply(`.... Starting Nii-sama`);
  ctx.reply(`.... Hi, im Tsumi`);
  ctx.reply(`Welcome ${first_name} ${last_name} nii-sama!`);
});

bot.command("giveRandomSauce", (x) =>
  getRandomCode().then((ex) =>
    x.reply(`${ex.code}, https://nhentai.net/g/${ex.code.replace("#", "")}/`)
  )
);

bot.command("getPopulars", (x) =>
  getMainPageContentPopular().then((ex) => {
    x.reply(
      `The current most popular doujins are (${ex.length}) : \n` +
        ex.map(
          ({ code, link }) =>
            "\n" +
            `Code : ${code} ,` +
            "\n" +
            `Link : https://nhentai.net${link}`
        )
    );
  })
);

bot.command("download_code", (act) => {
  let {
    update: {
      message: { text },
    },
  } = act;
  text = text.split(" ")[1];

  bot.telegram.sendDocument(act.chat.id, {
    source:
      "./source/[Shimazu Tekko] Taiyou to Hiyakeato♥ Sun and Sunburn♥ (COMIC Kairakuten BEAST 2021-11) [English] [atang] [Digital].rar",
  });
});

bot.command("show_doujin", (act) => {
  let {
    update: {
      message: { text },
    },
  } = act;
  text = text.split(" ")[1];

  getCodedDoujin(text).then(({ ogImages }) =>
    ogImages.sort().map((x) => act.reply(x))
  );
});

bot.command("getDetails", (s) => {
  let {
    message: { text },
  } = s;

  try {
    let sch = text.split(" ")[1];
    getCodedDoujin(sch).then(({ name, code, tags, artists }) => {
      s.reply(`Onii-sama that doujin name is : ${name}`);
      try {
        s.reply(`Onii-chan that doujin was made by : ${artists.join(" ")}`);
      } catch (e) {
        s.reply("A shit ton of people");
      }
      s.reply(`Nii-chan that doujin code is : ${code}`);
      try {
        s.reply(`And that doujin tags are : ${tags.join(" ")}`);
      } catch (e) {
        s.reply(
          `And that doujin tags are : ooops too much for my memory Nii-sama`
        );
      }
      s.reply(`What a perverted nii-sama you are!!!`);
    });
  } catch (e) {
    s.reply("You nii-sama that doesnt exists!!!");
  }
});

bot.command("who_created_you", (e) =>
  e.reply(`This young and handsome boy : https://github.com/YnfanteY2799`)
);

bot.command("where_are_you", (e) =>
  e.reply(
    `I'm somewhere near Tokyo!!!!, Just kidding i'm right here :\n https://github.com/YnfanteY2799/Telegram-Tsumi`
  )
);

bot.command("how_where_you_made", (e) =>
  e.reply(`The young master made me by doing lewd things with a printer !!!`)
);

bot.command("ohayou", (act) =>
  act.telegram.sendVideo(act.chat.id, {
    source:
      "https://www.youtube.com/shorts/88tOa9Q4pco?&ab_channel=MaxtheMeatGuy",
  })
);
// bot.command('ohayou', act => act.telegram.sendVideo(act.chat.id, {source:"./source/ohayou-onichan.mp4"}));

bot.command("how_are_you", (act) => {
  act.reply(
    "I don't know nii-sama, let me send you something for you to evaluate!"
  );
  act.telegram.sendPhoto(act.chat.id, {
    source: `./source/botPhotos/${Math.floor(Math.random() * 26)}.jpg`,
  });
});

bot.command("showme_something_hardcore", (act) => {
  act.reply("Here you go Nii-sama");
  act.telegram.sendVideo(act.chat.id, {
    source: `./source/hrd/${Math.floor(Math.random() * 4)}.mp4`,
  });
});

bot.command("showme_something_real_hardcore", (act) => {
  act.reply("Here you go Nii-sama");
  act.telegram.sendVideo(act.chat.id, {
    source: `./source/rhrd/${Math.floor(Math.random() * 6)}.mp4`,
  });
});

// bot.command('ginmme_wallpers', act =>{
//     act.reply("Here you go Nii-sama");
//     [1,3].map(x => act.telegram.sendPhoto(act.chat.id,{source:`./source/botPapers/${x}.png`}));
//     act.reply("Actually i only have 2 nii-sama Nii-sama");

// })

bot.command("what_can_you_do", (e) => {
  e.reply(`These are the only words i understand nii-sama \n `);
  e.reply("/giveRandomSauce");
  e.reply("/getPopulars");
  e.reply("/download_code");
  e.reply("/show_doujin");
  e.reply("/getDetails");
  e.reply("/who_created_you");
  e.reply("/where_are_you");
  e.reply("/how_where_you_made");
  e.reply("/what_can_you_do");
  e.reply("/ohayou");
  e.reply("/how_are_you");
  e.reply("/showme_something_hardcore");
  e.reply("/showme_something_real_hardcore");
  // e.reply("/ginmme_wallpers");
  e.reply("Test them nii-sama so, you will know !!!");
});

bot.help((e) => {
  e.reply(`These are the only words i understand nii-sama \n `);
  e.reply("/giveRandomSauce");
  e.reply("/getPopulars");
  e.reply("/download_code");
  e.reply("/show_doujin");
  e.reply("/getDetails");
  e.reply("/who_created_you");
  e.reply("/where_are_you");
  e.reply("/how_where_you_made");
  e.reply("/what_can_you_do");
  e.reply("/ohayou");
  e.reply("/how_are_you");
  e.reply("/showme_something_hardcore");
  e.reply("/showme_something_real_hardcore");
  // e.reply("/ginmme_wallpers");
  e.reply("Test them nii-sama so, you will know !!!");
});

bot.launch();
