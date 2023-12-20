import { Client, GatewayIntentBits } from "discord.js";
import { JsonDatabase } from "wio.db";
import { Generator } from "./utils/generator.js";

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });
client.db = new JsonDatabase({ databasePath: `./db/database.json` });
client.login(client.db.get(`token`));

client.on("ready", async () => {
    console.clear();
    console.log(`[BOT] ${client.user.tag} online!\n[Guilds] ${client.guilds.cache.size}\n[Users] ${client.users.cache.size}\n[Dev] https://github.com/eduzinnsp`);

    setInterval(async () => {
        let links = await new Generator(200)._x1020();
        let contents = links.join("\n");
        
        if (contents.length <= 200) return;        
        await client.db.get(`channels`).forEach(ch => {
            client.channels.cache.get(ch).send({ 
                files: [{ name: "urls.txt", attachment: Buffer.from(contents, 'utf-8') }]
            }).catch((e) => { return });
        })
    }, 10000);

});

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.author.id !== client.db.get(`owner`)) return;

    switch (msg.content) {
        case 'setchannel': {
            await client.db.push(`channels`, msg.channel.id);
            await msg.react("✅");

            await msg.delete().catch((e) => { return });
            break;
        }

        case 'rchannel': {
            await client.db.set(`channels`, client.db.get(`channels`).splice(cnd.indexOf(msg.channel.id), 1));
            await msg.react("✅");

            await msg.delete().catch((e) => { return });
            break;
        }

        case 'exit': {
            await msg.react("✅");
            await msg.delete().catch((e) => { return });

            await client.guilds.cache.get(msg.guild.id).leave();
            break;
        }
    }
});

process.on('unhandledRejection', (reason, promise) => {
    return;
});

process.on('uncaughtException', (error) => {
    return;
});