import { getFirestore, addDoc, collection, connectFirestoreEmulator, serverTimestamp, doc } from "firebase/firestore";
import { app } from './firebase';

const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

export async function sendUserData(user) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      displayName: user.displayName,
      uid: user.uid,
      email: user.email
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.log(e)
  }
}

export async function sendTypeTestResult(results) {
  try {
    const language = 'english200' //must have word list number, fix later to come with results parameter
    const seconds = results.seconds;
    
    const resultRef = await addDoc(collection(db, `tests/${language}/${seconds}`), {
      user: results.user.displayName,
      uid: results.user.uid,
      wpm: results.wpm,
      accuracy: results.accuracy,
      correctCharacterCount: results.correctCharacterCount,
      keystrokeCount: results.keystrokeCount,
      timestamp: serverTimestamp(),
    });
    console.log(`Document written to: ${resultRef.id}`);
  } catch (e) {
    console.log(e);
  }
}