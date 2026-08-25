import { auth } from "../../../app/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

export const authService = { signInWithGoogle };