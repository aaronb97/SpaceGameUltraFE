import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { client } from './client';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

auth.onIdTokenChanged(async (user) => {
  client.login(user);
});

document
  .getElementById('google-sign-in-button')
  ?.addEventListener('click', () => {
    signInWithPopup(auth, googleAuthProvider);
  });

document
  .getElementById('speed-boost-button')
  ?.addEventListener('click', async () => {
    client.speedboost();
  });
