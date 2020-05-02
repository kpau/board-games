import React, { useContext, useState } from 'react';
import * as vm from '@bgames/shared/vm';
import UserContext from '../../../context/user';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const User: React.FC = () => {
  const [savedUser, setSavedUser] = useContext(UserContext);
  const [tempUser, setTempUser] = useState<vm.User | null>(savedUser);

  const setName = (newName: string): void => {
    setTempUser({ ...tempUser, name: newName });
  };

  const saveUser = (): void => {
    setSavedUser(tempUser);
  };

  return (
    <div>
      <h2>User:</h2>
      <Input label="Name" value={tempUser?.name} onChange={setName} />
      <Button text="Save" onClick={saveUser} />
    </div>
  );
};

export default User;
