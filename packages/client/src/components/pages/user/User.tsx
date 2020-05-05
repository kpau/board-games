import React, { useContext, useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import {
  InputGroup, Form, FormLabel, Button, Jumbotron,
} from 'react-bootstrap';
import * as vm from '@bgames/shared/vm';
import { wait } from '@testing-library/react';
import UserContext from '../../../context/user';
import Control from '../../common/Input/Control';
import withTooltip from '../../../hoc/withTooltip';
import rest from '../../../services/rest';

const ButtonWithTooltip = withTooltip(Button);
const userRest = rest('user');

const User: React.FC = () => {
  const [savedUser, setSavedUser] = useContext(UserContext);
  const [tempUser, setTempUser] = useState<vm.User | null>(savedUser);

  const setName = (newName: string): void => {
    setTempUser({ ...tempUser, name: newName });
  };

  const saveUser = async (): Promise<void> => {
    if (tempUser === null) {
      return;
    }

    const newUser = await userRest.createOrUpdate(tempUser);

    setSavedUser(newUser);
  };

  const setRandomName = (): void => {
    // TODO
    setName(`random name #${Math.round(Math.random() * 100)}`);
  };

  return (
    <Jumbotron>
      <Form>
        <Form.Group>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <Control placeholder="Username" value={tempUser?.name} onChange={setName} />
            <InputGroup.Append>
              <ButtonWithTooltip id="rand-btn" tooltip="Random" variant="outline-secondary" onClick={setRandomName}>
                <FaRandom />
              </ButtonWithTooltip>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        {/* <Input label="Name" value={tempUser?.name} onChange={setName} /> */}
        <Button onClick={saveUser}>Save</Button>
      </Form>
    </Jumbotron>
  );
};

export default User;
