<p align="center"> <img width="600" src="https://i.imgur.com/UY2qF4h.png"/> </p>


 <h1 align="center">Discord.js with TypeScript & Bun Template </h1> <p align="center">A template for building Discord bots using Discord.js and TypeScript, powered by Bun for fast runtime and build performance.</p>





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
-  [Vitest Official Guide](https://vitest.dev/guide/) 
-  [TypeScript Lang Docs](https://www.typescriptlang.org/docs/)
-  [Discord.js Docs](https://discord.js.org/docs/packages/discord.js/14.16.3)
-  [Discord.js Guide](https://discordjs.guide/)
-  [Drizzle ORM Docs](https://orm.drizzle.team/docs/get-started)

And more.

### Why Bun? 
Bun is a fast JavaScript runtime. Not only that, it just seems more modern than working with Node.js. If you've previously worked with Node.js it should be more or less the same, if not easier. A lot of less headaches (In my personal opinion). If you do not like Bun, you can check out [my other project](https://github.com/SeymenNW/TypeScript-Starter-Projects) that aims to make it easier to get started with Node.js applications with TypeScript.




### Scripts
These scripts are created to ease the development and test process. Some of the scripts are currently not being used, but will be used in the future. Most of the database/drizzle scripts will not work yet.

**build:** `bun build ./src/index.ts --outdir ./build --target bun`  
**node-build:** `node ./src/index.ts`  
**deploy-commands:** `bun run ./scripts/deploySlashCommands.ts`  
**server-dev-watch:** `bun --watch ./src/index.ts`  
**server-dev:** `bun --hot ./src/index.ts`  
**run-build:** `bun run ./build/index.js`  
**debug:** `bun --inspect ./src/index.ts`  
**test-build:** `bun build --target=bun ./src/index.ts --outdir ./build`  
**db-pull:** `drizzle-kit introspect:pg`  
**db-push:** `drizzle-kit push:pg`  
**db-migrate:** `bun run ./src/drizzle/migrate.ts`  
**node-run:** `nodemon ./src/index.ts`



