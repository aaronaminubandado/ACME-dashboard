import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firestore";
import { Clients } from "./definitions";

export async function getAllClients() {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    
    if (querySnapshot.empty) {
      console.log("No documents found in the 'clients' collection.");
      return [];
    }

    // const clients = querySnapshot.docs.map((doc) => ({
    //   id: doc.id, // Include the document ID if needed
    //   ...doc.data(), // Spread the document data
    // }));

    const clients: Clients[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          image_url: data.image_url,
        };
      });

    return clients;
  } catch (error) {
    console.error("Error retrieving clients: ", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}