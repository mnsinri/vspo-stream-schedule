import master from "./streamerMaster.json";
import { Firestore } from "firebase-admin/firestore";

export const createMaster = async (db: Firestore, collectionName: string) => {
  const batch = db.batch();
  const masterRef = db.collection(collectionName);

  for (const [key, value] of Object.entries(master))
    batch.set(masterRef.doc(key), value);

  await batch.commit();
};
