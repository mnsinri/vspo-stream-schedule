import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { BaseStream, Stream } from "../../types";

type Returns2<T extends BaseStream> = {
  endedStreams: { id: string; data: Stream }[]; // {document id, document data}[]
  newStreams: T[];
};

// TODO: まとも
export const sortStreams2 = <T extends BaseStream>(
  streams: T[],
  snaps: QueryDocumentSnapshot<DocumentData>[]
): Returns2<T> => {
  const existingStreams = snaps.map((doc) => ({
    id: doc.id,
    data: doc.data() as Stream,
  }));

  const endedStreams = existingStreams.filter(
    ({ data }) =>
      !streams.find(
        ({ id, platform }) => data.id === id && data.platform === platform
      ) && !data.endTime
  );

  const newStreams = streams.filter(
    ({ id, platform }) =>
      !existingStreams.find(
        ({ data }) => data.id === id && data.platform === platform
      )
  );

  return { endedStreams, newStreams };
};

type Returns<T extends BaseStream> = {
  new: T[];
  updated: { id: string; data: T }[]; // {document id, document data}[]
  ended: { id: string; data: T }[]; // {document id, document data}[]
};

const diff = <T extends BaseStream>(a: T, b: T) => {
  return (
    a.title !== b.title ||
    a.scheduledStartTime !== b.scheduledStartTime ||
    a.thumbnail !== b.thumbnail
  );
};

export const sortStreams = <T extends BaseStream>(
  currentStreams: T[],
  pastStreams: { id: string; data: T }[]
): Returns<T> => {
  const currentStreamMap = new Map(currentStreams.map((s) => [s.id, s]));

  const { updated, ended } = pastStreams.reduce(
    (result: Pick<Returns<T>, "ended" | "updated">, pastStream) => {
      const currentStream = currentStreamMap.get(pastStream.data.id);

      if (!currentStream) {
        result.ended.push(pastStream);
        return result;
      }

      currentStreamMap.delete(currentStream.id);

      if (diff(pastStream.data, currentStream))
        result.updated.push({ ...pastStream, data: currentStream });

      return result;
    },
    {
      updated: [],
      ended: [],
    }
  );

  return {
    new: [...currentStreamMap.values()],
    updated,
    ended,
  };
};
