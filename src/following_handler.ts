import { User } from "./add_feed_handler";
import { readConfig } from "./config";
import { getFeedFollowsForUser, getUser } from "./lib/db/queries/users";


export async function handlerFollowing(_: string, currentUser: User, ...args: string[]) {
  
    const results = await getFeedFollowsForUser(currentUser.id);

    for(const result of results) {
        console.log(` - ${result.feeds.name}`);
    }

} 