import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator",
        }
    });
    const XMLString = await response.text();

    const parser = new XMLParser();
    const rawRss = parser.parse(XMLString);

    if(!rawRss.rss.channel) {
        throw new Error("response doesn't have channel field");
    }
    if(!rawRss.rss.channel.title || !rawRss.rss.channel.link || !rawRss.rss.channel.description) {
        throw new Error("metadata is not present");
    }

    const title = rawRss.rss.channel.title;
    const link = rawRss.rss.channel.link;
    const description = rawRss.rss.channel.description;

    let items = [];

    if(rawRss.rss.channel.item){
        if(Array.isArray(rawRss.rss.channel.item)) {
            for(const item of rawRss.rss.channel.item) {
                if(!item.title || !item.link || !item.description || !item.pubDate) {
                    continue;
                }
                items.push(item);
            }
        } else {
            const item = rawRss.rss.channel.item;
            if(item.title && item.link && item.description && item.pubDate) {
                items.push(item);
            }
        }
    }
    
    return {
        channel: {
            title: title,
            link: link,
            description: description,
            item: items
        }
    }

}