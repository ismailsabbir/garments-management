import React, { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.init";
export const AuthContext = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
  const [user, setuser] = useState({});
  const createuser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const authinfo = {
    user,
    createuser,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
