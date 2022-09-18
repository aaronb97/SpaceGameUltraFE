import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import axios from 'axios';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

auth.onIdTokenChanged(async (user) => {
  const token = await user?.getIdToken();
  axios.post(`${process.env.SERVER_URL}/login`, undefined, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
});

document
  .getElementById('google-sign-in-button')
  ?.addEventListener('click', () => {
    signInWithPopup(auth, googleAuthProvider);
  });
