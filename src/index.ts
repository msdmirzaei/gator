import { CommandRegistry, registerCommand, runCommand } from "./command_registry.js";
import { handlerLogin } from "./login_handler.js";
import process from "process";
import { handlerRegister } from "./register_handler.js";
import { handlerReset } from "./reset_handler.js";
import { handerUsers } from "./users_handler.js";
import { handlerAgg } from "./agg_handler.js";
import { handlerAddFeed } from "./add_feed_handler.js";
import { handlerFeeds } from "./feeds_handler.js";
import { handlerFollow } from "./follow_handler.js";
import { handlerFollowing } from "./following_handler.js";
import { middlewareLoggedIn } from "./middleware.js";
import { handlerUnfollow } from "./unfollow_handler.js";
import { handlerBrowse } from "./browse_handler.js";

async function main() {
   
    const commandRegistry: CommandRegistry = {};

    registerCommand(commandRegistry, "login", handlerLogin);
    registerCommand(commandRegistry, "register", handlerRegister);
    registerCommand(commandRegistry, "reset", handlerReset);
    registerCommand(commandRegistry, "users", handerUsers);
    registerCommand(commandRegistry, "agg", handlerAgg);
    registerCommand(
        commandRegistry,
        "addfeed",
        middlewareLoggedIn(handlerAddFeed)
    );
    registerCommand(commandRegistry, "feeds", handlerFeeds);
    registerCommand(
        commandRegistry,
        "follow",
        middlewareLoggedIn(handlerFollow)
    );
    registerCommand(
        commandRegistry,
        "following",
        middlewareLoggedIn(handlerFollowing)
    );
    registerCommand(
        commandRegistry,
        "unfollow",
        middlewareLoggedIn(handlerUnfollow)
    );
    registerCommand(
        commandRegistry,
        "browse",
        middlewareLoggedIn(handlerBrowse)
    );
    

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
    await runCommand(commandRegistry, cmdName, ...args);
    process.exit(0);
}

main();