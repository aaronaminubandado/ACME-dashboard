import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firestore";

export async function getAllClients() {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    
    if (querySnapshot.empty) {
      console.log("No documents found in the 'clients' collection.");
      return [];
    }

    const clients = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID if needed
      ...doc.data(), // Spread the document data
    }));

    return clients;
  } catch (error) {
    console.error("Error retrieving clients: ", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}