import axios from 'axios';
import { User } from 'firebase/auth';
import { auth } from './firebaseApp';

class Client {
  async login(user: User | null) {
    if (!user) {
      console.error('User not defined');
      return;
    }

    const token = await user.getIdToken();
    return axios.post(`${process.env.SERVER_URL}/login`, undefined, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  async speedboost() {
    if (!auth.currentUser) {
      console.error('User not defined');
      return;
    }

    const token = await auth.currentUser.getIdToken();
    axios.post(`${process.env.SERVER_URL}/speedboost`, undefined, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export const client = new Client();
