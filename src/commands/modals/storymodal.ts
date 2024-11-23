import { ActionRowBuilder, CommandInteraction, ModalBuilder, ModalSubmitInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import type { Command } from '../../types/Command';

const storymodal: Command = {
	data: new SlashCommandBuilder()
		.setName('storymodal')
		.setDescription('Write a story..'),


	async execute(interaction: CommandInteraction) { 

        const modal = new ModalBuilder({
            customId: `storyModal-${interaction.user.id}`,
            title: "Story Modal",
            
        });

        const storyTitleInput = new TextInputBuilder({
            custom_id: `storyTitleInput`,
            label: `Story Title`,
            style: TextInputStyle.Short
        });

        const storyContentInput = new TextInputBuilder({
            custom_id: `storyContentInput`,
            label: `Your Story`,
            style: TextInputStyle.Paragraph
        });

        const titleActionRow:any = new ActionRowBuilder().addComponents(storyTitleInput);
        const contentActionRow:any = new ActionRowBuilder().addComponents(storyContentInput);

        modal.addComponents(titleActionRow, contentActionRow);

        await interaction.showModal(modal);

        const filter = (interaction:ModalSubmitInteraction) => interaction.customId === `storyModal-${interaction.user.id}`;
        interaction.awaitModalSubmit({filter, time: 30_000})
        .then((modalInteraction) => {
            const storyTitleValue = modalInteraction.fields.getTextInputValue("storyTitleInput");
            const storyContentValue = modalInteraction.fields.getTextInputValue("storyContentInput");

            modalInteraction.reply(`STORY: ${storyTitleValue}\n\n${storyContentValue}`);
        });

      

	},
	cooldown: 4
};



export default storymodal;
