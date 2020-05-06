import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <Container as="footer" className={styles.footer}>
    Footer
  </Container>
);

export default Footer;
