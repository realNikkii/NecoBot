import { Client, Collection } from "discord.js";
import { slashCommand } from "../interfaces/slashCommand";
import { command } from '../interfaces/command';

export class NecoBotClient {

    discordClient!: Client;
    userCooldowns?: Set<string>;
    aliases?: Collection<string, command>;
    commands?: Collection<string, command>;
    slashCommands?: Collection<string, slashCommand>
    noDb: boolean = false;
    
    constructor(client:Client){
        this.discordClient = client;
    }
}