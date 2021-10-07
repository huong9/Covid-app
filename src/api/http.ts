import axios from 'axios';
import store from '../redux/store';
import { Account } from '../types/account.type';

const link = 'http://localhost:3301';

export const getData = (url: string) => {
  const { user } = store.getState();
  if (user) {
    return axios.get(`${link}${url}`, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
};

export const requestLogIn = (account: Account) => {
  return axios.post(`${link}/api/login`, account, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const requestLogOut = () => {
  const { user } = store.getState();
  return axios.post(`${link}/api/logout`, undefined, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
  });
};
