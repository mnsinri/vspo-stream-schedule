declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        YOUTUBE_API: string;
        TWITCH_API: string;
        TWITCH_TOKEN: string;
        TWITCH_CLIENT_ID: string;
        VSPO_YOUTUBE_CHANNELS_PATH: string;
        VSPO_TWITCH_CHANNELS_PATH: string;
        YOUTUBE_STREAMS_DATA_PATH: string;
        YOUTUBE_CHANNELS_DATA_PATH: string;
        TWITCH_STREAMS_DATA_PATH: string;
        TWITCH_CHANNELS_DATA_PATH: string;
      }
    }
  }
}
