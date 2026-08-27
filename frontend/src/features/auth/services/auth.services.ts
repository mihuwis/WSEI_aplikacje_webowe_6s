import { auth } from "../../../app/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
};

export const authService = { signInWithGoogle, signOut };