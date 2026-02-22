import { fetchFeed, scrapeFeeds } from "./feed";


export async function handlerAgg(_: string, durationStr: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);

    if(!match || match.length !== 3) {
        throw new Error("the pattern should be <number>(ms|s|m|h)");
    }

    let durationInMS = Number(match[1]);

    switch(match[2]) {
        case "ms":
            break;
        case "s":
            durationInMS *= 1000;
            break;
        case "m":
            durationInMS *= 60000;
            break;
        case "h":
            durationInMS *= 3600000;
            break;
        default:
            throw new Error("the pattern should be <number>(ms|s|m|h)");
    }

    console.log(`Collecting feeds every ${match[0]}`);

    scrapeFeeds().catch(console.error);

    const interval = setInterval(() => {
        scrapeFeeds().catch(console.error)
    }, durationInMS);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
    
}   