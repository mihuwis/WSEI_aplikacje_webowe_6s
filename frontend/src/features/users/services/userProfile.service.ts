import { collection, doc, getDoc, setDoc, getDocs, updateDoc  } from "firebase/firestore";
import { db } from "../../../app/firebase/firebase";
import type {UserProfile} from "../types/user.profile";
import type { User as FirebaseUser } from "firebase/auth";
import type { UserRole } from "../types/user.types";


const USERS_COLLECTION = "users";

const getByUid = async (uid:string) : Promise<UserProfile | undefined> => {
    const documentRef = doc(db, USERS_COLLECTION, uid);
    const documentSnapshot  = await getDoc(documentRef);
    if(!documentSnapshot.exists()){
        return undefined;
    }

    return {
        ...(documentSnapshot.data() as UserProfile),
        uid: documentSnapshot.id
    }

} 

const getAll = async () : Promise<UserProfile[]> =>{
    const collectionRef = collection(db, USERS_COLLECTION);
    const querySnapshot   = await getDocs(collectionRef);

    return querySnapshot.docs.map(
        (documentSnapshot) => ({
                    ...(documentSnapshot.data() as UserProfile),
        uid: documentSnapshot.id,
    }));
}

const updateRole = async (
    uid: string,
    role: UserRole,
): Promise<void> => {
    const documentRef = doc(db, USERS_COLLECTION, uid);

    await updateDoc(documentRef, {
        role,
        updatedAt: new Date().toISOString(),
    });
};

const updateBlockedStatus = async (
    uid: string,
    isBlocked: boolean,
): Promise<void> => {
    const documentRef = doc(db, USERS_COLLECTION, uid);

    await updateDoc(documentRef, {
        isBlocked,
        updatedAt: new Date().toISOString(),
    });
};

const createFromFireBaseUser = async (firebaseUser: FirebaseUser): Promise<UserProfile> => {
    if(!firebaseUser.email){
        throw new Error("user needs mail");
    }

    const userEmail = firebaseUser.email.trim().toLowerCase();
    const now = new Date().toISOString();

    const superAdminEmail = 
        (import.meta.env.VITE_SUPER_ADMIN_EMAIL ?? "")
        .trim().toLowerCase();

    const role: UserRole = 
        superAdminEmail !== "" && userEmail === superAdminEmail 
        ? "admin" : "guest";

    const newProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: userEmail,
        displayName: firebaseUser.displayName ?? userEmail,
        firstName: "",
        lastName: "",
        photoURL: firebaseUser.photoURL,
        role,
        isBlocked: false,
        createdAt: now,
        updatedAt: now
    }

    const documentRef = doc(db, USERS_COLLECTION, firebaseUser.uid);

    await setDoc(documentRef, newProfile);

    return newProfile;
}

const getOrCreate = async (firebaseUser: FirebaseUser): Promise<UserProfile> =>{
    const existingProfile = await getByUid(firebaseUser.uid);

    if(existingProfile){
        return existingProfile;
    }

    return createFromFireBaseUser(firebaseUser);
}

export const userProfileService = { getByUid, getOrCreate, getAll, updateRole, updateBlockedStatus }