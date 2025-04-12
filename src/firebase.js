// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Importa para usar la base de datos
import { getAnalytics } from "firebase/analytics"; // Si aún lo necesitas para análisis

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: "pokeuser-f4fcc",
  storageBucket: "pokeuser-f4fcc.firebasestorage.app",
  messagingSenderId: "284730641537",
  appId: "1:284730641537:web:6542c512e496b85ca91180",
  measurementId: "G-9NK1RVLDZ0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Inicializa la base de datos


export { app,db }; // Exporta la base de datos
