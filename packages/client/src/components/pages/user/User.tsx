import React, { useContext } from 'react';
import * as vm from '@bgames/shared/vm';
import { Container, Jumbotron } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import UserContext from '../../../context/user';
import UserForm from '../../common/userForm/UserForm';

const User: React.FC = () => {
  const location = useLocation<{ from: Location }>();
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const isNewUser = !user?.id;

  const navigate = (): void => {
    const path = location.state?.from;
    if (path) {
      history.push(path);
    } else if (isNewUser) {
      history.push('/');
    }
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
