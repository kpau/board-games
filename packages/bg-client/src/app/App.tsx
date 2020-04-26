import React from 'react';
import logo from '../logo.svg';
import styles from './App.module.scss';
import Test from '../Test/Test';

const App: React.FC = () => (
  <React.StrictMode>
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload. Test.
        </p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Test />
    </div>
  </React.StrictMode>
);

export default App;
