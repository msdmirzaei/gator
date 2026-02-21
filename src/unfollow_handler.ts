import { User } from "./add_feed_handler";
import { deleteFeedFollow } from "./lib/db/queries/feed_follows";


export async function handlerUnfollow(_: string, user: User, ...args: string[]) {
    if(args.length !== 1) {
        throw new Error("unfollow command accepts feed URL");
    }
    const feedURL = args[0];

    await deleteFeedFollow(user, feedURL);

}