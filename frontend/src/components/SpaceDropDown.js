import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/SpaceDropDown.css';

export const SpaceDropDown = ({ title, items }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (

    <div className='dropdown'>

      <div className={`dropdown-button ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        <button onClick={toggleDropdown} className='dropdown-toggle'>
          {title}
          <img onClick={toggleDropdown} src='/down-arrow.png' alt='menu-burger' />
        </button>
      </div>

      {isOpen &&

        <ul className='dropdown-menu'>

          {items.map((item, index) => (

            <li key={index}>

              <Link to={item.path} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
