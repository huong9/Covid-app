import { User } from './user.type';

export interface RootState {
  user: null | User;
  errorLogin: any;
}
