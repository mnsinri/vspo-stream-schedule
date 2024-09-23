import { DocumentReference, DocumentData } from "firebase-admin/firestore";
import { Client } from "./baseClient";
import { BaseStream, Channel, Config } from "../../types";
import { calcTTL } from "../utils";

export class TwitCastingClient extends Client {
  private clientId: string;
  private clientCode: string;
  private clientSecret: string;

  constructor(
    tokenDoc: DocumentReference<DocumentData>,
    config: Config["twitCasting"],
  ) {
    super(tokenDoc, "twitCasting");
    this.clientId = config.clientId.value();
    this.clientCode = config.clientCode.value();
    this.clientSecret = config.clientSecret.value();
  }

  // codeの更新がCFからできないので、機能しない
  protected override async generateToken(): Promise<string> {
    const params = new URLSearchParams({
      code: this.clientCode,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "authorization_code",
      redirect_uri: "https://vspo-stream-schedule.web.app/",
    });
    const request = new Request(
      "https://apiv2.twitcasting.tv/oauth2/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      },
    );

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

    const token = await this.getToken();

    const requests = userIds.map((id) => {
      const createRequest = (token: string) => {
        return new Request(`https://apiv2.twitcasting.tv/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-Api-Version": "2.0",
          },
        });
      };

      // return this.request(createRequest);

      return fetch(createRequest(token));
    });

    const responses = await Promise.all(requests);

    if (responses.some((r) => !r.ok)) return [];

    const bodies = await Promise.all(responses.map((r) => r.json()));

    return bodies.map((v) => ({
      id: v.user.screen_id,
      name: v.user.name,
      icon: v.user.image,
      platform: "twitCasting",
    }));
  }

  override async getStreams(userIds: string[]): Promise<BaseStream[]> {
    if (!userIds.length) return [];

    const token = await this.getToken();

    const requests = userIds.map((id) => {
      const createRequest = (token: string) => {
        return new Request(
          `https://apiv2.twitcasting.tv/users/${id}/current_live`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "X-Api-Version": "2.0",
            },
          },
        );
      };

      // return this.request(createRequest);

      return fetch(createRequest(token));
    });

    const responses = await Promise.all(requests);

    if (responses.some((r) => !r.ok)) return [];

    const bodies = await Promise.all(responses.map((r) => r.json()));

    return bodies.map((v) => {
      const startTime = new Date(v.movie.created * 1000).toISOString();

      return {
        id: v.movie.id,
        channelId: v.movie.user_id,
        title: v.movie.title,
        thumbnail: v.movie.large_thumbnail,
        url: v.movie.link,
        scheduledStartTime: startTime,
        startTime,
        platform: "twitCasting",
        ttl: calcTTL(startTime, 7),
      };
    });
  }
}
