import { useEffect, useState } from "react";
import { database } from "../Firebase";
import { get, onValue, ref } from "firebase/database";

const cacheVersion = "vspo";
const eventName = "OnUnmounted";
const event = new CustomEvent(eventName);

export const useDB = <T>(
  path: string,
  cacheAvailableTime: number //sec
): T[] => {
  const [value, setValue] = useState<T[]>([]);
  const resp = ref(database, path);
  cacheAvailableTime *= 1000;

  const doCache = (data: T[]) => {
    const newCache = {
      data,
      timestamp: new Date().toString(),
    };

    caches.open(cacheVersion).then((cache) => {
      cache.put(path, new Response(JSON.stringify(newCache)));
    });

    // console.log(`[useDB:${path}] Cached`);
  };

  useEffect(() => {
    (async () => {
      //check cache
      const cache = await caches
        .match(path)
        .then((r) => r?.text())
        .then((r) => JSON.parse(r ?? "null"));

      //if cache is available
      if (
        cache?.timestamp &&
        Date.now() - Date.parse(cache.timestamp) <= cacheAvailableTime
      ) {
        // console.log(`[useDB:${path}] Use Cache`);
        setValue(cache.data);
      } else {
        // console.log(`[useDB:${path}] Get from DB`);
        const data = await get(resp);
        if (data.exists()) {
          const val = data.val() as T[];
          doCache(val);
          setValue([...val]);
        }
      }

      //subscribe DB listener after 2 min
      const timerId = setTimeout(() => {
        const unsubscriber = onValue(resp, (snap) => {
          // console.log(`[useDB:${path}] OnValue`);
          if (snap.exists()) {
            const val = snap.val() as T[];
            doCache(val);
            setValue([...val]);
          }
        });

        //called on unmounted
        const handleOnce = () => {
          unsubscriber();
          document.removeEventListener(eventName, handleOnce);
          // console.log(`[useDB:${path}] Remove listener onValue`);
        };
        document.addEventListener(eventName, handleOnce);
      }, 2 * 60 * 1000);

      //called on unmounted
      const handleOnce = () => {
        clearTimeout(timerId);
        document.removeEventListener(eventName, handleOnce);
        // console.log(`[useDB:${path}] Remove listener timeout`);
      };
      document.addEventListener(eventName, handleOnce);

      // console.log(`[useDB:${path}] init`);
    })();

    return () => {
      document.dispatchEvent(event);
      // console.log(`[useDB:${path}] dispatch events on unmounted`);
    };
  }, []);

  return value;
};
