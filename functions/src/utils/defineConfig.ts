import { defineString, defineSecret } from "firebase-functions/params";
import { Config } from "../../types";

export const defineConfig = (): Config => {
  const twitch = {
    clientId: defineSecret("TWITCH_CLIENT_ID"),
    clientSecret: defineSecret("TWITCH_CLIENT_SECRET"),
  };
  const twitCasting = {
    clientId: defineSecret("TWIT_CASTING_CLIENT_ID"),
    clientCode: defineSecret("TWIT_CASTING_CLIENT_CODE"),
    clientSecret: defineSecret("TWIT_CASTING_CLIENT_SECRET"),
  };
  const collection = {
    secrets: defineString("COLLECTION_SECRETS"),
    master: defineString("COLLECTION_MASTER"),
    streams: defineString("COLLECTION_STREAMS"),
    streamers: defineString("COLLECTION_STREAMERS"),
  };
  const document = {
    token: defineString("DOCUMENT_TOKEN"),
  };

  return { twitch, twitCasting, collection, document };
};
