import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import HeaderBlock from '../components/HeaderBlock';

const Home = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <Menu />}
      <HeaderBlock />
    </>
  );
};

export default Home;
