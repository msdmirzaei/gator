import { readConfig } from "./config";
import { createFeed } from "./lib/db/queries/feeds";
import { getUser } from "./lib/db/queries/users";
import { feeds, users } from "./lib/db/schema";


export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;

export async function handlerAddFeed(_: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: addfeed <feed_name> <url>`);
    }

    const cfg = readConfig();
    const currentUser = await getUser(cfg.currentUserName);

    if (!currentUser) {
        throw new Error(`User ${cfg.currentUserName} not found`);
    }

    const [name, url] = args;
    const feed = await createFeed(name, url, currentUser.id);

    if (!feed) throw new Error("Failed to create feed");

    printFeed(feed, currentUser);

}

function printFeed(feed: Feed, user: User) {
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.createdAt}`);
    console.log(`* Updated:       ${feed.updatedAt}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}