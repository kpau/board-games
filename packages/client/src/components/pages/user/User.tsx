import React, { useContext } from 'react';
import { Jumbotron } from 'react-bootstrap';
import * as vm from '@bgames/shared/vm';
import UserContext from '../../../context/user';
import UserForm from '../../common/UserForm/UserForm';


const User: React.FC = () => {
  const [user, setUser] = useContext(UserContext);

  const navigate = (): void => {
    // TODO: navigate
  };

  const saveUser = (newUser: vm.User): void => {
    setUser(newUser);
    navigate();
  };


  const cancel = (): void => {
    navigate();
  };

  return (
    <Jumbotron>
      <UserForm user={user} save={saveUser} cancel={cancel} />
    </Jumbotron>
  );
};

export default User;
