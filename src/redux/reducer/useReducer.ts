import { Action } from 'redux';
import { RootState } from '../../types/rootState.type';
import { LOG_OUT, REJECT_LOG_IN, SET_USER } from '../actionType';

const initialValue: RootState = {
  user: null,
  errorLogin: false,
};
interface UserAction extends Action {
  payload: any;
}

export function userReducer(
  state: RootState = initialValue,
  action: UserAction
) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, errorLogin: false };

    case LOG_OUT:
      return { ...state, user: null, errorLogin: false };

    case REJECT_LOG_IN:
      return { ...state, user: null, errorLogin: true };
    default:
      return state;
  }
}
