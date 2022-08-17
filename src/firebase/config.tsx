import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC4k8NKeOt5iAdjv3J3fw9fNXV2xyLcYrE",
  authDomain: "quizform-fe694.firebaseapp.com",
  projectId: "quizform-fe694",
  storageBucket: "quizform-fe694.appspot.com",
  messagingSenderId: "593625095123",
  appId: "1:593625095123:web:40e6ee64c827085e10ed26",
  measurementId: "G-K3HH14D8LE",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
