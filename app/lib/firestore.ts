import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { DocumentData, getFirestore, SnapshotOptions } from "firebase/firestore";
import { clientConfig } from "./firebase-config";

const firebaseConfig = clientConfig;


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
