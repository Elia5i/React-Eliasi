import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function loadUserData(userId) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export async function saveUserData(userId, portfolio, balance) {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    portfolio,
    balance,
  });
}

export async function addTrade(userId, trade) {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    trades: arrayUnion(trade),
  });
}


