import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2b7oSkVlbZtl8jsMKLWBIS-DBvuuvbQA",
    authDomain: "nextjs-dashboard-9ffc3.firebaseapp.com",
    projectId: "nextjs-dashboard-9ffc3",
    storageBucket: "nextjs-dashboard-9ffc3.appspot.com",
    messagingSenderId: "281398546140",
    appId: "1:281398546140:web:8d8be287e6531388b96e19",
    measurementId: "G-MSDSXKLTJ8"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);