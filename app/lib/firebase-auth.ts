
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/lib/firestore';

export async function register(email:string, password:string){
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User was successfully created",user);
    } catch (error) {
        console.log("Error while trying to register user: ",error);
        
    }
}