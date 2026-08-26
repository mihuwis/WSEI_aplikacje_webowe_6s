import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { onAuthStateChanged } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

import { auth } from "../../../app/firebase/firebase";
import { authService } from "../services/auth.services";
import { userProfileService } from "../../users/services/userProfile.service";

import { AuthContext } from "./auth.context";
import type { AuthContextValue } from "./auth.context";
import type { UserProfile } from "../../users/types/user.profile";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {


    const [firebaseUser, setFirebaseUser] =
        useState<FirebaseUser | null>(null);

    const [userProfile, setUserProfile] =
        useState<UserProfile | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {
    const unsubscribe = onAuthStateChanged(
        auth,
        async (currentFirebaseUser) => {
            setIsLoading(true);
            setError(null);
            setFirebaseUser(currentFirebaseUser);

            if (!currentFirebaseUser) {
                setUserProfile(null);
                setIsLoading(false);
                return;
            }

            try {
                const profile =
                    await userProfileService.getOrCreate(
                        currentFirebaseUser,
                    );

                setUserProfile(profile);
            } catch (caughtError) {
                setUserProfile(null);

                const message =
                    caughtError instanceof Error
                        ? caughtError.message
                        : "Nie udało się pobrać profilu";

                setError(message);
            } finally {
                setIsLoading(false);
            }
        },
    );

    return unsubscribe;
}, []);



    const signInWithGoogle = async (): Promise<void> => {
        setError(null);

        try {
            await authService.signInWithGoogle();
        } catch (caughtError) {
            const message =
                caughtError instanceof Error
                    ? caughtError.message
                    : "Nie udało się zalogować";

            setError(message);
        }
    };

    const signOut = async (): Promise<void> => {
        setError(null);

        try {
            await authService.signOut();
        } catch (caughtError) {
            const message =
                caughtError instanceof Error
                    ? caughtError.message
                    : "Nie udało się wylogować";

            setError(message);
        }
    };

    const value: AuthContextValue = {
        firebaseUser,
        userProfile,
        isLoading,
        error,
        signInWithGoogle,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}
