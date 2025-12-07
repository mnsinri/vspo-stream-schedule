import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

let firestore: Firestore;

if (useMockData) {
  // In mock mode, firestore is not used as VspoStreamProvider returns early
  // We export a placeholder to satisfy the import, but it will never be called
  console.log("Firebase: Using mock data mode - Firebase initialization skipped");
  firestore = {} as Firestore;
} else {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    appId: import.meta.env.VITE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
}

export { firestore };
