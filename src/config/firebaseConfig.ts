import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgeicOxYcO8YUDyEQC8ManH2eX7P1ts0Q",
    authDomain: "catalogo-para-whatsapp.firebaseapp.com",
    projectId: "catalogo-para-whatsapp",
    storageBucket: "catalogo-para-whatsapp.appspot.com",
    messagingSenderId: "733940234993",
    appId: "1:733940234993:web:58daadf0547bda315dc750",
    measurementId: "G-JZ539DPJM7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

