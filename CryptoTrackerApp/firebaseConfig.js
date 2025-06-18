
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBeFkrmB4-YghM8WlmM8nEr10V4AkVzXE8",
  authDomain: "zerofy-97956.firebaseapp.com",
  projectId: "zerofy-97956",
  storageBucket: "zerofy-97956.firebasestorage.app",
  messagingSenderId: "986937909578",
  appId: "1:986937909578:web:884f447f1bb03215f3e1b3",
  measurementId: "G-JJF3B1CN8C"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
