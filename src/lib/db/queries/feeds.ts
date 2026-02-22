import { readConfig } from "src/config";
import { getUser } from "./users";
import { db } from "..";
import { feeds } from "../schema";
import { eq, sql } from "drizzle-orm";
import { Feed } from "src/add_feed_handler";

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({
        name: name,
        url: url,
        userId: userId
    }).returning();
    return result;
}


export async function getFeeds() {
    return await db.select().from(feeds);
}


export async function getFeedsByURL(url: string) {
    return await db.select().from(feeds).where(eq(feeds.url, url));
}

export async function markFeedFetched(feedId: string) {
    const [result] = await db.update(feeds).set({
        updatedAt: new Date(),
        lastFetchedAt: new Date(),
    }).where(eq(feeds.id, feedId)).returning();

    if(!result) {
        throw new Error(`update feed with id = ${feedId} failed.`);
    }
    
}


export async function getNextFeedToFetch() {
    const results = await db.execute(sql`SELECT * FROM feeds ORDER BY last_fetched_at ASC NULLS FIRST`);
    return results[0] as Feed;
}
