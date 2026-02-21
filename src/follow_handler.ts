import { User } from "./add_feed_handler";
import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/feed_follows";
import { getFeedsByURL } from "./lib/db/queries/feeds";
import { getUser } from "./lib/db/queries/users";


export async function handlerFollow(_: string, user: User , ...args: string[]) {
    if(args.length !== 1) {
        throw new Error("command should be: follow <url>");
    }
    const url = args[0];
    const feeds = await getFeedsByURL(url);
    if(feeds.length === 0) {
        throw new Error("there is no such feed");
    }
    const feed = feeds[0];

    const results = await createFeedFollow(user.id, feed.id);

    const result = results[0];

    console.log(`Feed name: ${result.feeds.name}`);
    console.log(`User: ${result.users.name}`);
    
}