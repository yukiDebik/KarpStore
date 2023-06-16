import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRgV4CEfjUwu9ViRVjJK-YpJ4auogpHm0",
  authDomain: "karpstore-71f34.firebaseapp.com",
  projectId: "karpstore-71f34",
  storageBucket: "karpstore-71f34.appspot.com",
  messagingSenderId: "56260179429",
  appId: "1:56260179429:web:11969a8922ff98fc076b0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;