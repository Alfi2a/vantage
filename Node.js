import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

// When the site is visited, trigger bot
app.get('/activate-bot', async (req, res) => {
  const channelId = process.env.ACTIVE_CHANNEL_ID; // predefined channel

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return res.status(404).send('Channel not found');

    await channel.send('✅ Successfully activated!');
    res.send({ success: true, message: 'Bot activated in Discord channel!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Failed to activate bot' });
  }
});

// Serve static website files
app.use(express.static('public')); // place your HTML, CSS, JS here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
