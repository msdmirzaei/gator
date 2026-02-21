import { getFeeds } from "./lib/db/queries/feeds";
import { getUserById } from "./lib/db/queries/users";

export async function handlerFeeds(_: string) {
    const feeds = await getFeeds();
    for(const feed of feeds) {
        const user = await getUserById(feed.userId!);
        console.log(`Feed name: ${feed.name}`);
        console.log(`Feed URL: ${feed.url}`);
        console.log(`Feed User: ${user.name}`);
    }
}