import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const createUserByEmailPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("state observing!")
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    },[])
    
    const authInfo = {
        user,
        loading,
        createUserByEmailPassword,
        loginWithEmailAndPassword,
        updateUserProfile,
        loginWithGoogle,
        passwordReset,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;