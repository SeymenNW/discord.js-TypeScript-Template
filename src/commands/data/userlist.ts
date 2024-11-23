import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import type { Command } from '../../types/Command';
import { db } from '../../drizzle/db';
import { usersTable } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

const userlist: Command = {
	data: new SlashCommandBuilder()
		.setName('userlist')
		.setDescription('Lists the users from db'),


	async execute(interaction: any) { 

		
		const userMail = await db
		.select({
			mail: usersTable.email
		})
		.from(usersTable);
	
		const cmdInteraction = interaction as CommandInteraction;

		userMail[0].mail


		let userList = "Mails: ";

		for (const user of userMail) {
			userList = userList + " - " + user.mail
		}

		cmdInteraction.reply(userList);


		

	},
	cooldown: 4
};



export default userlist;
