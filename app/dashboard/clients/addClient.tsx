// AddClientButton.tsx
"use client"; // This directive ensures that the component is treated as a Client Component

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firestore";
import { useState } from "react";

export default function AddClientButton() {
  const [isAdding, setIsAdding] = useState(false);

  async function addClient() {
    setIsAdding(true);
    try {
      const docRef = await addDoc(collection(db, "clients"),{
        name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
      console.error("Error adding document: ", error);
    } finally {
      setIsAdding(false);
    }
  }

  async function checkFirestoreConnection() {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      if (querySnapshot.empty) {
        console.log("No documents found in the 'clients' collection.");
      } else {
        console.log("Firestore is connected. Documents found:");
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      }
    } catch (error) {
      console.error("Error connecting to Firestore: ", error);
    }
  }

  return (
    <>
    <button 
    onClick={addClient} 
    disabled={isAdding}
    className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
      {isAdding ? "Adding..." : "Add Client"}
    </button>
    <button 
    onClick={checkFirestoreConnection} 
    className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    >
      Check Connection
    </button>
    </>
  );
}
