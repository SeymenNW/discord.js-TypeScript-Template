import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/Command';

const userlist: Command = {
    data: new SlashCommandBuilder()

        // Command setup
        .setName('createuser')
        .setDescription('Lists the users from db')

        // Command Options
        .addStringOption(option => 
            option.setName('name')
                .setDescription('The name of the user')
                .addChoices(
                    { name: "Test Name (Omar)", value: "Omar" },
                    { name: "Test Name (Youssef)", value: "Youssef" },
                    { name: "Test Name (Ali)", value: "Ali" },
                    { name: "Test Name (Khaled)", value: "Khaled" }
                )
                .setRequired(true)
        )

        .addNumberOption(option => 
            option.setName('age')
                .setDescription('The age of the user')
                .addChoices(
                    { name: "22", value: 22 },
                    { name: "34", value: 34 },
                    { name: "55", value: 55 },
                    { name: "18", value: 18 }
                )
                .setRequired(true)
        )

        .addStringOption(option => 
            option.setName('mail')
                .setDescription('The mail of the user')
                .setAutocomplete(true) // Enable autocomplete
                .setRequired(true)
        ) as SlashCommandBuilder,

    // Autocomplete handler
    async autoComplete(interaction: any) {
        const focusedOption = interaction.options.getFocused();
        let choices: string[] = [];

        if (focusedOption.name === 'mail') {
            // Sample data to simulate dynamic mail options (replace with DB query if needed)
            choices = [
                'Omar@mycompany.com', 
                'Youssef@fromkabul.com', 
                'Ali@mail.com', 
                'Khaled@fmail.com'
            ];
        }

        // Filter choices based on the focused input
        const filtered = choices.filter(choice =>
            choice.toLowerCase().startsWith(focusedOption.value.toLowerCase())
        );

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        );
    },

    // Execute the command
    async execute(interaction: any) {
        const nameValue = interaction.options.get('name')?.value;
        const ageValue = interaction.options.get('age')?.value;
        const mailValue = interaction.options.get('mail')?.value;

        // Reply with the chosen data
        await interaction.reply(`You chose: ${nameValue}. He is ${ageValue} years old. \nHis mail is ${mailValue}`);
    },

    cooldown: 4
};

export default userlist;