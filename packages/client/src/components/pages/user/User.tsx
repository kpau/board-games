import React, { useContext } from 'react';
import * as vm from '@bgames/shared/vm';
import { Container, Jumbotron } from 'react-bootstrap';
import UserContext from '../../../context/user';
import UserForm from '../../common/userForm/UserForm';

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
    <Container>
      <Jumbotron fluid>
        <UserForm user={user} save={saveUser} cancel={cancel} />
      </Jumbotron>
    </Container>
  );
};

export default User;
