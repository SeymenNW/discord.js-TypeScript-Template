import { AutocompleteInteraction, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/Command';
import { db } from '../../drizzle/db';
import { usersTable } from '../../drizzle/schema';


//As a note this command works but it doesnt make sense. Used for testing and showing examples of DB connection/error handling.

const userlist: Command = {
    data: new SlashCommandBuilder()

        // Command Setup 
        .setName('createuser')
        .setDescription('Lists the users from db')

       
        .addStringOption(option => 
            option.setName('name')
                .setDescription('The name of the user')
                // .addChoices(
                //     { name: "Test Name (Omar)", value: "Omar" },
                //     { name: "Test Name (Youssef)", value: "Youssef" },
                //     { name: "Test Name (Ali)", value: "Ali" },
                //     { name: "Test Name (Khaled)", value: "Khaled" }
                // )
                .setRequired(true)
        )

        .addNumberOption(option => 
            option.setName('age')
                .setDescription('The age of the user')
                // .addChoices(
                //     { name: "22", value: 22 },
                //     { name: "34", value: 34 },
                //     { name: "55", value: 55 },
                //     { name: "18", value: 18 }
                // )
                .setRequired(true)
        )

        .addStringOption(option => 
            option.setName('mail')
                .setDescription('The mail of the user')
                .setAutocomplete(true) 
                .setRequired(true)
        ) as SlashCommandBuilder,


    // Auto Complete Setup    
    async autoComplete(interaction: AutocompleteInteraction) { 
        const focusedOption = interaction.options.getFocused(true);
        let choices: stringChoice[] = [];

    const usersFromDb:stringChoice[] =  await db.select({
            name: usersTable.name,
            value: usersTable.email
        }).from(usersTable)
        

        if (focusedOption.name === 'mail') {
            choices = usersFromDb
        }


        const filtered = choices.filter(choice =>
            choice.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())
        );

        await interaction.respond(
            filtered.map(choice => ({ name: choice.name, value: choice.value }))
        );
    },

     // Command Execution / Logic
    async execute(interaction: CommandInteraction) { 

        let error:any;
        
        const nameValue:any|string = interaction.options.get('name')?.value;
        const ageValue:any|number = interaction.options.get('age')?.value;
        const mailValue:any|string = interaction.options.get('mail')?.value;


        try {
        await db.insert(usersTable).values({
            name: nameValue,
            age: ageValue,
            email: mailValue
        });

    } catch(err) {
        error = err;
      console.log(err);
      
        
    }

        if (error) {

            if (error.message === `duplicate key value violates unique constraint "users_email_unique"`)
            await interaction.reply(`Error: Duplicate Mails detected. ${mailValue} already exists. (Must be unique)`);
        } else {
            await interaction.reply(`You Added: ${nameValue}. He is ${ageValue} years old. \nHis mail is ${mailValue}`);
        }
    },

    cooldown: 4
};



type stringChoice = {
    name: string,
    value: string
}

export default userlist;
