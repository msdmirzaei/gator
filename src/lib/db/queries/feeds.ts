import { readConfig } from "src/config";
import { getUser } from "./users";
import { db } from "..";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";

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