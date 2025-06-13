import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '../../components/Footer';

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout; 