// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFSBzSv2nmtBzGYfcWo-wsEbrzr0jCCiY",
  authDomain: "securityt-2462b.firebaseapp.com",
  projectId: "securityt-2462b",
  storageBucket: "securityt-2462b.appspot.com",
  messagingSenderId: "472208355940",
  appId: "1:472208355940:web:ddae9c104bd42aeb5a6571"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
