declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        YOUTUBE_API: string;
        DATABASE_CHANNELS_PATH: string;
        DATABASE_STREAMS_PATH: string;
      }
    }
  }
}
