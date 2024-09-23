import { DocumentReference, DocumentData } from "firebase-admin/firestore";
import { Client } from "./baseClient";
import { Channel, BaseStream } from "../../types";
import { calcTTL } from "../utils";

// TODO: Do not use api key
export class YoutubeClient extends Client {
  constructor(tokenDoc: DocumentReference<DocumentData>) {
    super(tokenDoc, "youtube");
  }

  protected override async generateToken(): Promise<string> {
    const doc = await this.tokenDoc.get();
    const token = doc.data()?.["youtube"];
    return token;
  }

  override async getChannels(userIds: string[]): Promise<Channel[]> {
    if (!userIds.length) return [];

    const createRequest = (token: string) => {
      const query = new URLSearchParams({
        key: token,
        part: ["snippet", "contentDetails"].join(","),
        id: userIds.join(","),
      });
      return new Request(
        `https://www.googleapis.com/youtube/v3/channels?${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    };

    const bodies = await this.request(createRequest);

    return bodies.items.map((v: any) => ({
      id: v.id,
      name: v.snippet.title,
      icon: v.snippet.thumbnails.default.url,
      platform: "youtube",
    }));
  }

  override async getStreams(userIds: string[]): Promise<BaseStream[]> {
    if (!userIds.length) return [];

    const _token = await this.getToken();

    // アップロード済み動画から最新動画10本取得
    const plRequests = userIds.map((id) => {
      // ChannelIdの2文字目を'U'にするとそのチャンネルのuploadedPlaylistIdになる
      const playlistId = id.replace(/(?<=^.{1})./, "U");
      const query = new URLSearchParams({
        key: _token,
        part: "snippet",
        playlistId,
        maxResults: "10",
      });

      const request = new Request(
        `https://www.googleapis.com/youtube/v3/playlistItems?${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return fetch(request);
    });

    const plResponses = await Promise.all(plRequests);
    const plResults = await Promise.all(
      plResponses.filter((r) => r.ok).map((r) => r.json()),
    );
    const uploadedVideosMap = new Map<string, any>(
      plResults.flatMap((v: any) =>
        v.items.map((item: any) => [
          item.snippet.resourceId.videoId,
          {
            id: item.snippet.resourceId.videoId,
            channelId: item.snippet.channelId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            platform: "youtube",
          },
        ]),
      ),
    );

    // 動画idからstatus+liveStreamDetailを取得
    const maxVideoResults = 50;
    const videoIds = [...uploadedVideosMap.keys()];
    const vRequests = Array.from(
      { length: Math.ceil(videoIds.length / maxVideoResults) },
      (_, i) => {
        const query = new URLSearchParams([
          ["key", _token],
          ...["liveStreamingDetails", "status"].map((v) => ["part", v]),
          ...videoIds
            .slice(i * maxVideoResults, (i + 1) * maxVideoResults)
            .map((v) => ["id", v]),
        ]);

        const request = new Request(
          `https://www.googleapis.com/youtube/v3/videos?${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        return fetch(request);
      },
    );

    const vResponses = await Promise.all(vRequests);
    const vResults = await Promise.all(
      vResponses.filter((r) => r.ok).map((r) => r.json()),
    );
    return vResults.flatMap((j) =>
      j.items
        .filter(
          (item: any) =>
            item.liveStreamingDetails?.activeLiveChatId != null &&
            item.liveStreamingDetails?.scheduledStartTime != null,
        )
        .map((item: any) => ({
          ...uploadedVideosMap.get(item.id),
          scheduledStartTime: item.liveStreamingDetails.scheduledStartTime,
          startTime: item.liveStreamingDetails.actualStartTime,
          endTime: item.liveStreamingDetails.actualEndTime,
          ttl: calcTTL(item.liveStreamingDetails.scheduledStartTime, 7),
        })),
    );
  }
}
