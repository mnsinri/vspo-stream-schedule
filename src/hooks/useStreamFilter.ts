import { useCallback, useMemo, useEffect } from "react";
import { Stream, Streamer } from "types";
import { deduplication } from "src/utils";
import { useSetting, useSettingDispatch } from "src/providers";

type StreamerFilterAction = {
  type: "addStreamerFilter" | "removeStreamerFilter" | "clearStreamerFilter";
  payload?: Streamer["id"][];
};

type FilterAction = StreamerFilterAction;

export const useStreamFilter = (streams: Stream[]) => {
  const {
    filter: { streamerIds },
  } = useSetting();
  console.log("render useStreamFilter");
  const settingDispatch = useSettingDispatch();

  const filter = useCallback(
    (action: FilterAction): void => {
      if (action.type === "addStreamerFilter") {
        const ids = deduplication(streamerIds.concat(action.payload ?? []));
        settingDispatch({ target: "streamerIds", payload: ids });
        return;
      }

      if (action.type === "removeStreamerFilter") {
        const ids = streamerIds.filter(
          (id) => !(action.payload ?? []).includes(id),
        );
        settingDispatch({ target: "streamerIds", payload: ids });
        return;
      }

      if (action.type === "clearStreamerFilter") {
        settingDispatch({ target: "streamerIds", payload: [] });
        return;
      }
    },
    [streamerIds],
  );

  useEffect(() => {
    if (streamerIds.length > 0)
      filter({ type: "addStreamerFilter", payload: streamerIds });
  }, []);

  const filteredStreams = useMemo(() => {
    console.log("update filteredStreams; streams are... ");
    console.log(streams);
    return streams.filter((s) => {
      return streamerIds.length === 0 || streamerIds.includes(s.streamerId);
    });
  }, [streams, streamerIds]);

  return { filteredStreams, streamerIds, filter };
};
