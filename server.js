import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Discord bot setup
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Login with bot token
client.login(process.env.TOKEN);

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}!`);
});

// Serve your website files
app.use(express.static('public'));

// Endpoint to auto-activate bot when someone visits the website
app.get('/activate-bot', async (req, res) => {
  try {
    const channel = await client.channels.fetch(process.env.ACTIVE_CHANNEL_ID);
    if (!channel) return res.status(404).send('Channel not found');

    await channel.send('✅ Successfully activated!');
    res.send({ success: true, message: 'Bot activated in Discord channel!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Failed to activate bot' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
