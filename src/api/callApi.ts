import axios from 'axios';
import store from '../redux/store';
import { Account } from '../types/account.type';

const baseURL = 'http://localhost:3301';

export const getData = (url: string) => {
  const { user } = store.getState();
  if (user) {
    return axios.get(`${baseURL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
};

export const requestLogIn = (account: Account) => {
  return axios.post(`${baseURL}/api/login`, account, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const requestLogOut = () => {
  const { user } = store.getState();
  return axios.post(`${baseURL}/api/logout`, undefined, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
  });
};
