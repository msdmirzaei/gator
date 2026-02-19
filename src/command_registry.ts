import { CommandHandler } from "./command_handler.js";


export type CommandRegistry = Record<string, CommandHandler>;


export function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandRegistry, cmdName: string, ...args: string[]) {
    if(cmdName in registry) {
        return registry[cmdName](cmdName, ...args);
    }
    throw new Error(`${cmdName} is not in registry`);
}