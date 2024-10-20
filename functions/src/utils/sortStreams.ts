import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { BaseStream, Stream } from "../../types";

type Returns<T extends BaseStream> = {
  endedStreams: { id: string; data: Stream }[]; // {document id, document data}[]
  newStreams: T[];
};

// TODO: まとも
export const sortStreams = <T extends BaseStream>(
  streams: T[],
  snaps: QueryDocumentSnapshot<DocumentData>[],
): Returns<T> => {
  const existingStreams = snaps.map((doc) => ({
    id: doc.id,
    data: doc.data() as Stream,
  }));

  const endedStreams = existingStreams.filter(
    ({ data }) =>
      !streams.find(
        ({ id, platform }) => data.id === id && data.platform === platform,
      ) && !data.endTime,
  );

  const newStreams = streams.filter(
    ({ id, platform }) =>
      !existingStreams.find(
        ({ data }) => data.id === id && data.platform === platform,
      ),
  );

  return { endedStreams, newStreams };
};
