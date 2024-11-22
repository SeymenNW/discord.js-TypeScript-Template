import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import type { Command } from '../../types/Command';

const pingCommand: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),


	async execute(interaction: any) { 

		const cmdInteraction = interaction as CommandInteraction;
		const wait:any = (await import('timers/promises')).setTimeout;

		await cmdInteraction.deferReply();
		await wait(6_000);
		await cmdInteraction.editReply('Pong!');
		await wait(1_000);
		await cmdInteraction.editReply('Second PONG');
		await wait(1_000);
		await cmdInteraction.deleteReply();


	},
	cooldown: 4
};



export default pingCommand;
