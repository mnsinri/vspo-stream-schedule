import { StringParam, SecretParam } from "firebase-functions/lib/params/types";

export type Config = {
  // youtube: {
  //   clientId: SecretParam;
  //   clientSecret: SecretParam;
  // };
  twitch: {
    clientId: SecretParam;
    clientSecret: SecretParam;
  };
  twitCasting: {
    clientId: SecretParam;
    clientCode: SecretParam;
    clientSecret: SecretParam;
  };
  collection: {
    secrets: StringParam;
    master: StringParam;
    streams: StringParam;
    streamers: StringParam;
  };
  document: {
    token: StringParam;
  };
};
