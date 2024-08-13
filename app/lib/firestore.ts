import { initializeApp } from "firebase/app";
import { DocumentData, getFirestore, SnapshotOptions } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIRE_APIKEY,
    authDomain: process.env.FIRE_AUTHDOMAIN,
    projectId: process.env.FIRE_PROJECTID,
    storageBucket: process.env.FIRE_STORAGEBUCKET,
    messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
    appId: process.env.FIRE_APPID,  
    measurementId: process.env.FIRE_MEASUREMENTID 
};
						

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
