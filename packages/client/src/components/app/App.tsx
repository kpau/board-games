import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as vm from '@bgames/shared/vm';
import {
  Container,
} from 'react-bootstrap';
import Test from '../../Test/Test';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from '../pages/home/Home';
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
        <Container>
          <Header />

          <Switch>
            <Route exact path="/" component={Test} />
            <Route path="/welcome" component={User} />
            <Route path="/rooms" component={Home} />
            <Route path="/games" component={Home} />
            <Route path="/user" component={User} />
          </Switch>

          <Footer />
        </Container>

      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
