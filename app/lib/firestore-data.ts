'use server';
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firestore";
import { Clients } from "./definitions";
import { revalidatePath } from "next/cache";


export async function getAllClients() {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    
    if (querySnapshot.empty) {
      console.log("No documents found in the 'clients' collection.");
      return [];
    }

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

export async function getClientById(id: string) {
    try {
      // Reference to the specific client document
      const clientRef = doc(db, "clients", id);
      
      // Fetch the document
      const docSnap = await getDoc(clientRef);
      
      // Check if the document exists
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const client: Clients = {
            id: docSnap.id,
            name: docData.name,
            email: docData.email,
            image_url: docData.image_url
        }

        return client;
      } else {
        // Return null if the document does not exist
        console.log("No such document!");
        throw Error("Document not found!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw Error("Error getting document");
    }
  }
  
  export async function deleteClientById(id: string){
    try {
      // Reference to the specific client document
      const clientRef = doc(db, "clients", id);
  
      // Delete the document
      await deleteDoc(clientRef);
      revalidatePath("/dashboard/clients");
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
      throw Error("Error deleting document");
    }
  }