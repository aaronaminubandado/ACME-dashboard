import { initializeApp } from "firebase/app";
import { DocumentData, getFirestore, SnapshotOptions } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.FIRE_APIKEY,
//     authDomain: process.env.FIRE_AUTHDOMAIN,
//     projectId: process.env.FIRE_PROJECTID,
//     storageBucket: process.env.FIRE_STORAGEBUCKET,
//     messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
//     appId: process.env.FIRE_APPID,  
//     measurementId: process.env.FIRE_MEASUREMENTID 
// };

const firebaseConfig = {
    apiKey: "AIzaSyD2b7oSkVlbZtl8jsMKLWBIS-DBvuuvbQA",
    authDomain: "nextjs-dashboard-9ffc3.firebaseapp.com",
    projectId: "nextjs-dashboard-9ffc3",
    storageBucket: "nextjs-dashboard-9ffc3.appspot.com",
    messagingSenderId: "281398546140",
    appId: "1:281398546140:web:8d8be287e6531388b96e19", 
    measurementId: "G-MSDSXKLTJ8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
