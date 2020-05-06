import React, { useContext, useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import {
  InputGroup, Form, Button, Jumbotron, ButtonGroup, Col, Spinner, Alert,
} from 'react-bootstrap';
import * as vm from '@bgames/shared/vm';
import UserContext from '../../../context/user';
import Control from '../../common/Input/Control';
import withTooltip from '../../../hoc/withTooltip';
import rest from '../../../services/rest';
import * as rand from '../../../services/random';

type Feedback = {
  show: boolean;
  valid?: boolean;
  msg?: string;
};

const ButtonWithTooltip = withTooltip(Button);
const userRest = rest('user');

const User: React.FC = () => {
  const [savedUser, setSavedUser] = useContext(UserContext);
  const [tempUser, setTempUser] = useState<vm.User | null>(savedUser);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [feedback, setFeedback] = useState<Feedback>({ show: false });

  const isExistingUser = !!tempUser?.id;

  if (initial && !savedUser?.name) {
    setInitial(false);
    setTempUser({ ...tempUser, name: rand.username() });
  }

  const navigate = (save: boolean): void => {
    // TODO: go to the next page
    setFeedback({
      show: true,
      valid: true,
      msg: save ? 'Save success' : 'Canceled',
    });
  };

  const setName = (newName: string): void => {
    setTempUser({ ...tempUser, name: newName });
  };

  const saveUser = async (): Promise<void> => {
    if (tempUser === null) {
      return;
    }

    setLoading(true);
    try {
      const newUser = await userRest.createOrUpdate(tempUser);
      setSavedUser(newUser);
      navigate(true);
    } catch {
      setFeedback({
        show: true,
        valid: false,
        msg: 'Couldn\'t save the user :(',
      });
    } finally {
      setLoading(false);
    }
  };

  const setRandomName = (): void => {
    setName(rand.username());
  };

  const cancel = (): void => {
    setLoading(true);
    navigate(false);
    setLoading(false);
  };

  return (
    <Jumbotron>
      <Form>
        <Form.Row>
          <Form.Group as={Col} md={6} className="m-auto">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <Control placeholder="Username" value={tempUser?.name} onChange={setName} readOnly={loading} />
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
            <Button onClick={saveUser}>
              {loading && (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              ) }
              {' '}
              Save
            </Button>
            {isExistingUser && <Button onClick={cancel} variant="secondary" disabled={loading}>Cancel</Button>}
          </ButtonGroup>
        </Form.Row>

        <Form.Row>
          <Col md={6} className="m-auto">
            <Alert show={feedback.show} variant={feedback.valid ? 'success' : 'danger'} dismissible onClose={() => setFeedback({ show: false })}>
              {feedback.msg}
            </Alert>
          </Col>
        </Form.Row>
      </Form>
    </Jumbotron>
  );
};

export default User;
