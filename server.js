const { Client, GatewayIntentBits } = require('discord.js');

// Importing this allows you to access the environment variables of the running node process
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () => {
    console.log(`Logged in as THE ${client.user.tag}!`)
})

client.on("messageCreate", message => {
    
    // Here's I'm using one of An Idiot's Guide's basic command handlers. Using the PREFIX environment variable above, I can do the same as the bot token below
    if (message.author.bot) return;

    message.reply("Received message: " + message.content);
    const command = message.content;

    if (command === "ping") {
        message.reply("Pong!");
    }

})

client.login(process.env.DISCORD_TOKEN);