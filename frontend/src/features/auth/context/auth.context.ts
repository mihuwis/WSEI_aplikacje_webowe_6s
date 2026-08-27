import type { User as FirebaseUser } from "firebase/auth";
import { createContext } from "react";
import type { UserProfile } from "../../users/types/user.profile";

export interface AuthContextValue {
    firebaseUser: FirebaseUser | null;
    userProfile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext =
    createContext<AuthContextValue | undefined>(undefined);