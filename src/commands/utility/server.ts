import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Embed, EmbedBuilder, Emoji, SlashCommandBuilder, type Interaction } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Information about this server'),
	async execute(interaction:any) { 

		const cmdInteraction = interaction as CommandInteraction;
		const infoEmbed = new EmbedBuilder()
		.setTitle(`INFO About: ${cmdInteraction.guild?.name}`)
		.setDescription(`This server has ${cmdInteraction.guild?.memberCount} members!`)
		.setColor('Blurple');

		
        const gitBtn = new ButtonBuilder()
        .setLabel('GitHub Repo')  
        .setStyle(ButtonStyle.Link) 
		.setURL("https://github.com/SeymenNW/discord.js-TypeScript-Template")
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(gitBtn);

        cmdInteraction.reply({
            embeds: [infoEmbed],
            components: [row],
        });        
	},
};
