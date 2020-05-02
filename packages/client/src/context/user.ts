import React from 'react';
import * as vm from '@bgames/shared/vm';
import { WritableContext } from './context';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const UserContext = React.createContext<WritableContext<vm.User | null>>([null, (): void => {}]);

export default UserContext;
