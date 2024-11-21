import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

const botToken: string = process.env.BOT_TOKEN ?? '';
const clientId: string = process.env.CLIENT_ID ?? '';
const guildId: string = process.env.GUILD_ID ?? '';

if (!botToken || !clientId || !guildId) {
  console.error('[ERROR] Missing required environment variables.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`[ONLINE] Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection<string, Command>();

const loadCommands = async () => {
  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      try {
        const command: Command = (await import(filePath)).default;

        //@ts-ignore
        if (command.data && command.execute) {
          client.commands.set(command.data.name, command);
          console.log(`[SUCCES] Loaded command: ${command.data.name}`);
        } else {
          console.warn(`[WARNING] Command at '${filePath}' is missing "data" or "execute" property.`);
        }
      } catch (error) {
        console.error(`[ERROR] Failed to load command at '${filePath}':`, error);
      }
    }
  }
};

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.warn(`[WARNING] No command found for interaction: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`[ERROR] Error executing command '${interaction.commandName}':`, error);
    await interaction.reply({ content: '[ERROR] There was an error while executing this command.', ephemeral: true });
  }
});

loadCommands().then(() => {
  client.login(botToken).catch((error) => {
    console.error('[ERROR] Failed to log in to Discord:', error);
  });
});
