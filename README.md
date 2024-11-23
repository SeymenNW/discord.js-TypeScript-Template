<p  align="center">  <img  width="600"  src="https://i.imgur.com/UY2qF4h.png"/>  </p>

  
  

<h1  align="center">Discord.js with TypeScript & Bun Template </h1>  <p  align="center">A template for building Discord bots using Discord.js and TypeScript, powered by Bun for fast runtime and build performance.</p>

  
  
  
  
  

## Features

- Written in TypeScript

- Discord.js integration for building bots.

- Fast builds and runtime with Bun.

- Includes scripts for development, debugging, and command deployment.

  

The project dependencies and scripts contain references to Drizzle and Postgres. This is due to the fact these will be added in the future, but feel free to delete the dependencies you don't need (Will likely not alter with the program at all).

  

This template is based on the [official Discord.js Guide](https://discordjs.guide/). However I have modified it to (partially) support TypeScript. Partially because there is still work to do in regards of:

  

- Interfaces

- Types

- Improved Type Safety

  

The goal is to make it seem as seamless as possible for TypeScript.

  

## Resources

### Docs / Guides

- [Vitest Official Guide](https://vitest.dev/guide/) (For Unit Testing)

- [TypeScript Lang Docs](https://www.typescriptlang.org/docs/) (For Type Script Documentation)

- [Discord.js Docs](https://discord.js.org/docs/packages/discord.js/14.16.3) 

- [Discord.js Guide](https://discordjs.guide/)

- [Drizzle ORM Docs](https://orm.drizzle.team/docs/get-started) (For Database connections)

And more.

### Why Bun?

Bun is a fast JavaScript runtime. Not only that, it just seems more modern than working with Node.js. If you've previously worked with Node.js it should be more or less the same, if not easier. A lot of less headaches (In my personal opinion). If you do not like Bun, you can check out [my other project](https://github.com/SeymenNW/TypeScript-Starter-Projects) that aims to make it easier to get started with Node.js applications with TypeScript.


### Scripts

These scripts are created to ease the development and test process. Some of the scripts are currently not being used, but will be used in the future. Most of the database/drizzle scripts will not work yet.

### How to run?
Please note that this template is not entirely finished yet and there are still some things that probably will break. There's no guarantee for it to work as is, but feel free to ask for help.

**NOTE:** Drizzle ORM is currently a part of the Template. However it is not mandatory to be used and the bot should work OK without setting it up. You can go ahead and delete the codes related to Drizzle ORM in the Index.ts file. However I also use this as a base to creating new bots and I mainly use Drizzle ORM for database stuff, so I will keep it in. If you use MongoDB or other ORMs, you should probably swap it out.

 1. First create an Environment Variables file (.env). This should be based on the example provided (example.env.text). Then fill out your bot details and (optionally) database details. 

2. Make sure to install the dependencies with`bun install`
 
 2. After that you should deploy the commands. To do this run the following script:
	 **deploy-commands** . Which will execute the following:  `bun run ./scripts/deploySlashCommands.ts`.
3. Now you can run the bot with the following script: `bun --hot ./src/index.ts` (or **bun run server-dev**).

This template is based on the official discord.js guide. So it should *almost* be the best way to create a bot. Tutorials on YouTube are either too complex or too simple for beginners. My recommendation is to use the official guide.
