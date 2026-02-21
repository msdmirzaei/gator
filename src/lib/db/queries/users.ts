import {db} from "..";
import { feedFollows, feeds, users } from "../schema";
import { eq } from "drizzle-orm";


export async function createUser(name: string) {
    const [result] = await db.insert(users).values({name: name}).returning();
    return result;
}

export async function getUser(name: string) {
    const result = await db.select().from(users).where(eq(users.name, name));
    return result[0];
}

export async function getUserById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}

export async function deleteUsers() {
    const result = await db.delete(users);
    return result
}

export async function getUsers() {
    return await db.select().from(users);
}


export async function getFeedFollowsForUser(userId: string) {
    const result = await db.select().from(users).innerJoin(feedFollows, eq(users.id, feedFollows.userId)).innerJoin(feeds, eq(feedFollows.feedId, feeds.id)).where(eq(users.id, userId));
    return result;
}