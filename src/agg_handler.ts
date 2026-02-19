import { fetchFeed } from "./feed";


export async function handlerAgg(_: string) {
    const res = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(res, null, 2));
}