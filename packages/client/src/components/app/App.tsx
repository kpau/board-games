import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as vm from '@bgames/shared/vm';
import Header from './header/Header';
import Home from '../pages/home/Home';
import Rooms from '../pages/rooms/Rooms';
import Games from '../pages/games/Games';
import User from '../pages/user/User';
import UserContext from '../../context/user';
import { WritableContext } from '../../context/context';
import { useStorage } from '../../hooks/storage';
import config from '../../config.json';

const App: React.FC = () => {
  const [user, setUser] = useStorage<vm.User>('local', config.storage.keys.user);
  const userContext: WritableContext<vm.User | null> = [user, setUser];

  return (
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/games" component={Games} />
          <Route path="/user" component={User} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
