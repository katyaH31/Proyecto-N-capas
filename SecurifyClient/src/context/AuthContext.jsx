import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
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
      
      const token = await result.user.getIdToken(true)
      const user = result.user;
      setUser(user);
      const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario autenticado en el backend:', data);
        setUser(data.role);
        setRole(data.role.authorities[0].authority);
        localStorage.setItem('token', data.data);
        localStorage.setItem('role', data.role.authorities[0].authority);
      } else {
        console.error('Error en la autenticación del backend');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null)
      setRole("")
      signOut(auth)
  };

  useEffect(() => {
    setUser()
    setRole()
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
