import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { client } from './client';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

const getGoogleButton = () => {
  const button = document.getElementById('google-sign-in-button');

  if (!button) throw new Error('Unable to find Google sign in button');

  return button;
};

const getSignOutButton = () => {
  const button = document.getElementById('sign-out-button');

  if (!button) throw new Error('Unable to find sign out button');

  return button;
};

auth.onIdTokenChanged(async (user) => {
  if (user) {
    const data = await client.login(user);
    getGoogleButton().style.display = 'none';
    getSignOutButton().style.display = 'block';
  } else {
    getGoogleButton().style.display = 'block';
    getSignOutButton().style.display = 'none';
  }
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

getSignOutButton().addEventListener('click', () => {
  signOut(auth);
});
