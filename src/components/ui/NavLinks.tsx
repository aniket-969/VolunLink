'use client'
import React from 'react';

interface Link {
  text: string;
  href: string;
  icon?: JSX.Element;
}

interface NavLinksProps {
  links: Link[];
  orientation?: 'horizontal' | 'vertical';
  activeLink?: string;
 
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ links, orientation = 'horizontal', activeLink,  className }) => {
  return (
    <nav className={`${className} ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
       
        >
          {link.icon && <span className="icon">{link.icon}</span>}
          {link.text}
        </a>
      ))}
    </nav>
  );
};
 
export default NavLinks;
