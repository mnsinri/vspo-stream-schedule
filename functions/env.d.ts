declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        YOUTUBE_API: string;
        VSPO_YOUTUBE_CHANNELS_PATH: string;
        YOUTUBE_STREAMS_DATA_PATH: string;
        YOUTUBE_CHANNELS_DATA_PATH: string;
      }
    }
  }
}
