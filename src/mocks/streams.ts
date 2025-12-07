import { StreamResponse } from "@types";

const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);
const sixHoursLater = new Date(now.getTime() + 6 * 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const ttl = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

export const mockStreams: StreamResponse[] = [
  {
    id: "stream1",
    streamerId: "streamer1",
    channelId: "UCvUc0m317LWTTPZoBQV479A",
    platform: "youtube",
    title: "【LIVE】Morning Gaming Stream - Apex Legends Ranked",
    thumbnail: "/mock-images/stream-thumbnail.svg",
    url: "https://www.youtube.com/live/YkySMsypko8",
    scheduledStartTime: oneHourAgo.toISOString(),
    startTime: oneHourAgo.toISOString(),
    ttl,
  },
  {
    id: "stream2",
    streamerId: "streamer2",
    channelId: "shinomiyaruna",
    platform: "twitch",
    title: "【Twitch】Chatting and Game Testing Stream",
    thumbnail: "/mock-images/stream-thumbnail.svg",
    url: "https://www.twitch.tv/shinomiyaruna",
    scheduledStartTime: twoHoursLater.toISOString(),
    ttl,
  },
  {
    id: "stream3",
    streamerId: "streamer1",
    channelId: "UCvUc0m317LWTTPZoBQV479A",
    platform: "youtube",
    title: "【Minecraft】Building a new house! Come hang out!",
    thumbnail: "/mock-images/stream-thumbnail.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    scheduledStartTime: fourHoursLater.toISOString(),
    ttl,
  },
  {
    id: "stream4",
    streamerId: "streamer3",
    channelId: "hanabusarisa",
    platform: "twitCasting",
    title: "Late Night Chat Stream 💤",
    thumbnail: "/mock-images/stream-thumbnail.svg",
    url: "https://twitcasting.tv/hanabusarisa",
    scheduledStartTime: sixHoursLater.toISOString(),
    ttl,
  },
  {
    id: "stream5",
    streamerId: "streamer2",
    channelId: "UC61OwuYOVuKkpKnid-43Twg",
    platform: "youtube",
    title: "【歌枠】Singing Stream - Taking Requests!",
    thumbnail: "/mock-images/stream-thumbnail.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    scheduledStartTime: tomorrow.toISOString(),
    ttl,
  },
  {
    id: "stream6",
    streamerId: "streamer3",
    channelId: "UCD5W21JqNMv_tV9nfjvF9sw",
    platform: "youtube",
    title: "【Valorant】Competitive Ranked Grind",
    thumbnail: "/mock-images/stream-thumbnail.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    scheduledStartTime: tomorrow.toISOString(),
    ttl,
  },
];
