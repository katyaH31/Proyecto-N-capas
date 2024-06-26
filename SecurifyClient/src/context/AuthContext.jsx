import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../api/firebase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
      console.log("Usuario conectado:", user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser);

      if (currentUser) {
        const email = currentUser.email;
        if (email === "tareasinfokml@gmail.com") {
          setRole("admin");
        } else if (email === "lisbetherrera017@gmail.com") {
          setRole("visitor");
        } else if (email === "moiezequiel2003@gmail.com") {
          setRole("vigilant");
        } else if (email === "pereiradavo71@gmail.com") {
          setRole("residentadmin"); // Aquí poner página de encargado
        } else if (email === "kmltareas@gmail.com") {
          setRole("resident"); // Aquí poner página de encargado
        } else {
          setRole("user"); // default role
        }
      } else {
        setRole("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
