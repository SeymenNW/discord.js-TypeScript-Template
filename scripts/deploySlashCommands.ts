import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

const commands: Array<any> = [];

const botToken: string = process.env.BOT_TOKEN ?? '';
const clientId: string = process.env.CLIENT_ID ?? '';
const guildId: string = process.env.GUILD_ID ?? '';

if (!botToken || !clientId || !guildId) {
	console.error('[ERROR] Missing required environment variables.');
	process.exit(1);
}

const foldersPath = path.join(__dirname, '..', 'src', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

(async () => {
	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = await import(filePath); 
			const commandData = command.default; 

			if (commandData && 'data' in commandData && 'execute' in commandData) {
				commands.push(commandData.data.toJSON());
			} else {
				console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	const rest = new REST().setToken(botToken);

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data: any = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error('[ERROR] Failed to reload application commands:', error);
	}
})();