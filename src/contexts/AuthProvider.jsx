import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase/firebase_init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const authInfo = {
        registerUser,
        signInUser
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;