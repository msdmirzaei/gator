import { User } from "./add_feed_handler";
import { getPostsForUser } from "./lib/db/queries/posts";


export async function handlerBrowse(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  
  let limit = 2;
  if (args.length === 1) {
    const specifiedLimit = parseInt(args[0]);
    if (!isNaN(specifiedLimit)) {
      limit = specifiedLimit;
    } else {
      throw new Error(`Usage: ${cmdName} [limit]`);
    }
  }

  const posts = await getPostsForUser(user.id, limit);

  console.log(`Found ${posts.length} posts for user ${user.name}:`);
  for (const post of posts) {
    console.log(`--- ${post.title} ---`);
    console.log(`Source: ${post.feedName} | Published: ${post.publishedAt}`);
    console.log(`Link: ${post.url}`);
    console.log(`Description: ${post.description || "No description provided."}`);
    console.log("=".repeat(40));
  }
}
