const { Client, GatewayIntentBits } = require('discord.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Importing this allows you to access the environment variables of the running node process
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const keywords = process.env.KEYWORDS.split(' ');

client.on("ready", () => {
    console.log(`Logged in as THE ${client.user.tag}!`)
})

client.on("messageCreate", message => {
    
    // Here's I'm using one of An Idiot's Guide's basic command handlers. Using the PREFIX environment variable above, I can do the same as the bot token below
    if (message.author.bot) return;

    const options = {
        headers: {
            Authorization: "Bearer " + process.env.DISCORD_TOKEN
        }
    };

    fetch(process.env.AFFIRMATION_URL, options)
        .then( res => res.json() )
        .then( data => {
            // message.reply("Received message: " + message.content);
            const command = message.content;

            for (var i = 0; i < keywords.length; i++)
            {
                console.log(`Check keyword ` + keywords[i]);
                if (command.includes(keywords[i])) {
                    console.log(`Keyword detected ` + keywords[i]);
                    message.reply(data.affirmation);
                    return;
                }
            }
        
            console.log(`User message did not contain a keyword. Ignoring.`)
        }
    );
})

client.login(process.env.DISCORD_TOKEN);