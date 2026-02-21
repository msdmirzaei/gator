import { CommandRegistry, runCommand } from "./command_registry.js";
import { handlerLogin } from "./login_handler.js";
import process from "process";
import { handlerRegister } from "./register_handler.js";
import { handlerReset } from "./reset_handler.js";
import { handerUsers } from "./users_handler.js";
import { handlerAgg } from "./agg_handler.js";
import { handlerAddFeed } from "./add_feed_handler.js";
import { handlerFeeds } from "./feeds_handler.js";

async function main() {
    const registry: CommandRegistry = {
        "login": handlerLogin,
        "register": handlerRegister,
        "reset": handlerReset,
        "users": handerUsers,
        "agg": handlerAgg,
        "addfeed": handlerAddFeed,
        "feeds": handlerFeeds,
    }
    if(process.argv.length < 3) {
        console.log("not enough arguments were provided.");
        process.exit(1);
    }
    if(process.argv[2] === "login" && process.argv.length === 3) {
        console.log("username is required.");
        process.exit(1);
    }
    const cmdName = process.argv[2];
    const args = process.argv.slice(3);
    await runCommand(registry, cmdName, ...args);
    process.exit(0);
}

main();