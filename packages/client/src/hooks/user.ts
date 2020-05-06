import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as vm from '@bgames/shared/vm';
import UserContext from '../context/user';

export default function useUser(): vm.User | null {
  const [user] = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  if (!user?.id) {
    history.push('/user', { from: location });
  }

  return user;
}
