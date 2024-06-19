declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        YOUTUBE_API: string;
        TWITCH_API: string;
        TWITCH_CLIENT_ID: string;
        TWITCH_CLIENT_SECRET: string;
        TWIT_CASTING_TOKEN: string;
        YOUTUBE_CHANNELIDS_PATH: string;
        TWITCH_CHANNELIDS_PATH: string;
        TWIT_CASTING_USERIDS_PATH: string;
        DATA_URI: string;
      }
    }
  }
}
