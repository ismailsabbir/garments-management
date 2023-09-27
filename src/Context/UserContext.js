import React, { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookprovider = new FacebookAuthProvider();
const UserContext = ({ children }) => {
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);

  const createuser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userlogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userlogout = () => {
    return signOut(auth);
  };
  const signinwithgoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const facebooksignup = () => {
    return signInWithPopup(auth, facebookprovider);
  };
  const resetpassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateusername = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authinfo = {
    user,
    createuser,
    userlogin,
    signinwithgoogle,
    userlogout,
    resetpassword,
    updateusername,
    facebooksignup,
    loading,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
