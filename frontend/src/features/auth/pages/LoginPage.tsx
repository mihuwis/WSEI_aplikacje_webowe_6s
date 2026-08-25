import { useState } from "react"
import { authService } from "../services/auth.services"
import type { User as FirebaseUser } from "firebase/auth";

export function LoginPage(){
    const [user, setUser] = useState<FirebaseUser | null>(null);

    const handleSignIn = async () => {
        
        const loggedUser = await authService.signInWithGoogle();
        setUser(loggedUser)
    }
    return(
        <div>
            <h2>Login here</h2>
            <div>
                <button 
                    type="button"
                    onClick={ handleSignIn }>
                    Log in with Google
                </button>
            </div>

            <div>
                {user ? (
                    <div>
                        <p> {user?.displayName} </p>
                        <p> {user?.email} </p>
                        <p> {user?.uid} </p>
                    </div>
                ): (
                    <div>
                        <p>please log in</p>
                    </div>
                )}

            </div>
        </div>
    )
}