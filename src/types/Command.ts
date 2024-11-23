import type { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction } from 'discord.js';

export type Command = {
    data: SlashCommandBuilder;
    autoComplete?(interaction: CommandInteraction):any;
    execute(interaction: CommandInteraction): Promise<void>;
    cooldown?: number
  };