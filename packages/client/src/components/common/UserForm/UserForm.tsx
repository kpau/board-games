import React, { useState } from 'react';
import {
  Button, Form, Col, InputGroup, ButtonGroup, Spinner, Alert,
} from 'react-bootstrap';
import * as vm from '@bgames/shared/vm';
import { FaRandom } from 'react-icons/fa';
import random from '../../../services/random';
import rest from '../../../services/rest';
import withTooltip from '../../../hoc/withTooltip';
import Control from '../Control/Control';

interface UserFormParams {
  user: vm.User | null;
  save(user: vm.User): void;
  cancel(): void;
}

type Feedback = {
  show: boolean;
  valid?: boolean;
  msg?: string;
};

const ButtonWithTooltip = withTooltip(Button);
const userRest = rest('user');

const UserForm: React.FC<UserFormParams> = (params) => {
  const initUser = params.user || {
    name: random.username(),
  };

  const [user, setUser] = useState(initUser);
  const [loading, setLoading] = useState(false);
  const [fb, setFb] = useState<Feedback>({ show: false });

  const isExistingUser = !!user.id;

  const setName = (newName: string): void => {
    setUser({ ...user, name: newName });
  };

  const setRandomName = (): void => {
    setName(random.username());
  };

  const setMsg = (valid: boolean, msg: string): void => {
    setFb({
      ...fb,
      show: true,
      valid,
      msg,
    });
  };

  const clearMsg = (): void => setFb({ ...fb, show: false });

  const save = async (): Promise<void> => {
    setLoading(true);
    clearMsg();

    try {
      const newUser = await userRest.createOrUpdate(user);
      setMsg(true, 'Saved!');
      params.save(newUser);
    } catch {
      setMsg(false, 'Couldn\'t save the user :(');
    } finally {
      setLoading(false);
    }
  };

  const cancel = (): void => {
    clearMsg();
    params.cancel();
  };


  const spinner = loading && (
    <>
      <Spinner
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      {' '}
    </>
  );

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} md={6} className="m-auto">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <Control placeholder="Username" value={user.name} onChange={setName} readOnly={loading} />
            <InputGroup.Append>
              <ButtonWithTooltip id="rand-btn" tooltip="Random" variant="outline-secondary" onClick={setRandomName} disabled={loading}>
                <FaRandom />
              </ButtonWithTooltip>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <ButtonGroup as={Col} md={6} className="m-auto">
          <Button onClick={save} disabled={loading}>
            {spinner}
            Save
          </Button>
          {isExistingUser && <Button onClick={cancel} variant="secondary" disabled={loading}>Cancel</Button>}
        </ButtonGroup>
      </Form.Row>

      <Form.Row>
        <Col md={6} className="m-auto">
          <Alert show={fb.show} variant={fb.valid ? 'success' : 'danger'} dismissible onClose={clearMsg}>
            {fb.msg}
          </Alert>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default UserForm;
