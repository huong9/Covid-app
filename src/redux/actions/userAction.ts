import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { requestLogIn, requestLogOut } from '../../api/callApi';
import { Account } from '../../types/account.type';
import { User } from '../../types/user.type';
import { SET_USER } from '../actionType';

export const setUser = (acc: null | User) => {
  return {
    type: SET_USER,
    acc,
  };
};

export const logIn = (acc: Account) => (dispatch: Dispatch) => {
  requestLogIn(acc).then((res: AxiosResponse<any>) =>
    dispatch(setUser(res.data.user))
  );
};

export const logOut = () => (dispatch: Dispatch) => {
  requestLogOut()?.then((_) => {
    dispatch(setUser(null));
  });
};
