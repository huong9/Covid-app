import { Action } from 'redux';
import { RootState } from '../../types/rootState.type';
import { LOG_OUT, SET_USER } from '../actionType';

const initialValue: RootState = {
  user: null,
};
interface UserAction extends Action {
  acc: any;
}

export function userReducer(
  state: RootState = initialValue,
  action: UserAction
) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.acc };

    case LOG_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
