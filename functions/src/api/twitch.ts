import { DocumentReference, DocumentData } from "firebase-admin/firestore";
import { Client } from "./baseClient";
import { BaseStream, Channel, Config } from "../../types";
import { calcTTL } from "../utils";

export class TwitchClient extends Client {
  private clientId: string;
  private clientSecret: string;

  constructor(
    tokenDoc: DocumentReference<DocumentData>,
    config: Config["twitch"],
  ) {
    super(tokenDoc, "twitch");
    this.clientId = config.clientId.value();
    this.clientSecret = config.clientSecret.value();
  }

  setThumbnailSize(url: string) {
    return url.replace(/%?{width}/, "320").replace(/%?{height}/, "180");
  }

  protected override async generateToken(): Promise<string> {
    const query = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });
    const request = new Request(`https://id.twitch.tv/oauth2/token?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const response = await fetch(request);

    if (!response.ok)
      throw new Error(
        `generateToken request failed. ${response.status}:${response.statusText}`,
      );

    const { ["access_token"]: token } = await response.json();

    await this.setToken(token);
    return token;
  }

  override async getChannels(userIds: string[]): Promise<Channel[]> {
    if (!userIds.length) return [];

    const createRequest = (token: string) => {
      const query = new URLSearchParams(userIds.map((id) => ["id", id]));
      return new Request(`https://api.twitch.tv/helix/users?${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": this.clientId,
          "Content-Type": "application/json",
        },
      });
    };

    const bodies = await this.request(createRequest);

    return bodies.data.map((v: any) => ({
      id: v.id,
      name: v.display_name,
      icon: v.profile_image_url,
      platform: "twitch",
    }));
  }

  override async getStreams(userIds: string[]): Promise<BaseStream[]> {
    if (!userIds.length) return [];

    const createRequest = (token: string) => {
      const query = new URLSearchParams([
        ["first", `${userIds.length}`],
        ...userIds.map((id) => ["user_id", id]),
      ]);
      return new Request(`https://api.twitch.tv/helix/streams?${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": this.clientId,
          "Content-Type": "application/json",
        },
      });
    };

    const body = await this.request(createRequest);

    return body.data.map((v: any) => ({
      id: v.id,
      channelId: v.user_id,
      title: v.title,
      thumbnail: this.setThumbnailSize(v.thumbnail_url),
      url: `https://www.twitch.tv/${v.user_login}`,
      scheduledStartTime: v.started_at,
      startTime: v.started_at,
      platform: "twitch",
      ttl: calcTTL(v.started_at, 7),
    }));
  }

  async updateStreamToVideo<T extends BaseStream>(stream: T): Promise<T> {
    const createRequest = (token: string) => {
      const query = new URLSearchParams([
        ["user_id", stream.channelId],
        ["type", "archive"],
        ["first", "1"],
      ]);
      return new Request(`https://api.twitch.tv/helix/videos?${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": this.clientId,
          "Content-Type": "application/json",
        },
      });
    };

    const result = await this.request(createRequest);
    const video = result.data.shift();

    if (stream.id !== video.stream_id) throw new Error("can not updated.");

    return {
      ...stream,
      url: video.url,
      thumbnail: this.setThumbnailSize(video.thumbnail_url),
    };
  }
}
