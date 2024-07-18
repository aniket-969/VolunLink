// components/Navbar.tsx
import React from 'react';
import NavLinks from './ui/NavLinks';

const Navbar: React.FC = () => {
    const userId = "1233jejr3"
  const links = [
    { text: 'Home', href: '/' },
    { text: 'Create', href: '/volunteerform' },
    { text: 'Profile', href: `/profile/${userId}` },
  ];

  return (
    <header className="navbar">
      <div className="container">
        <NavLinks links={links} orientation="horizontal" />
      </div>
    </header>
  );
};

export default Navbar;
