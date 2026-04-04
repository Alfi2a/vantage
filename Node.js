import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Discord bot setup
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

// API endpoint to trigger bot
app.post('/activate-bot', async (req, res) => {
  const { channelId } = req.body;

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return res.status(404).send('Channel not found');

    await channel.send('✅ Successfully activated!');
    res.send({ success: true, message: 'Bot activated in channel!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Failed to activate bot' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
