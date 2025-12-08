import { StreamerResponse } from "@types";

export const mockStreamers: Record<string, StreamerResponse> = {
  streamer1: {
    youtube: {
      id: "UCvUc0m317LWTTPZoBQV479A",
      name: "一ノ瀬うるは",
      icon: "/mock-images/streamer-icon.svg",
      platform: "youtube",
    },
    twitch: {
      id: "uruhaichinose",
      name: "一ノ瀬うるは",
      icon: "/mock-images/streamer-icon.svg",
      platform: "twitch",
    },
    twitCasting: {
      id: "uruhaichinose",
      name: "一ノ瀬うるは",
      icon: "/mock-images/streamer-icon.svg",
      platform: "twitCasting",
    },
    order: 1,
  },
  streamer2: {
    youtube: {
      id: "UC61OwuYOVuKkpKnid-43Twg",
      name: "紫宮るな",
      icon: "/mock-images/streamer-icon.svg",
      platform: "youtube",
    },
    twitch: {
      id: "shinomiyaruna",
      name: "紫宮るな",
      icon: "/mock-images/streamer-icon.svg",
      platform: "twitch",
    },
    twitCasting: {
      id: "shinomiyaruna",
      name: "紫宮るな",
      icon: "/mock-images/streamer-icon.svg",
      platform: "twitCasting",
    },
    order: 2,
  },
  streamer3: {
    youtube: {
      id: "UCD5W21JqNMv_tV9nfjvF9sw",
      name: "英リサ",
      icon: "/mock-images/streamer-icon.svg",
      platform: "youtube",
    },
    twitch: {
      id: "hanabusarisa",
      name: "英リサ",
      icon: "/mock-images/streamer-icon.svg",
      platform: "twitch",
    },
    twitCasting: {
      id: "hanabusarisa",
      name: "英リサ",
      icon: "/mock-images/streamer-icon.svg",
      platform: "twitCasting",
    },
    order: 3,
  },
};
