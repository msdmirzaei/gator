import { and, eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { User } from "src/add_feed_handler";
import { getFeedsByURL } from "./feeds";


export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feedFollows).values({ userId: userId, feedId: feedId }).returning();
    const result = await db.select().from(feedFollows).innerJoin(users, eq(users.id, feedFollows.userId)).innerJoin(feeds, eq(feeds.id, feedFollows.feedId)).where(eq(feedFollows.id, newFeedFollow.id));
    return result;
}


export async function deleteFeedFollow(user: User, feedURL: string) {
    const feeds = await getFeedsByURL(feedURL);
    const feed = feeds[0];
    const result = db.delete(feedFollows).where(
        and(
            eq(feedFollows.userId, user.id), 
            eq(feedFollows.feedId, feed.id)
        ));
    return result;
}