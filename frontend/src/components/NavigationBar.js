import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { LoginLink } from './authentication';
import { SpaceDropDown } from './SpaceDropDown';
import {PageCreator} from './PageCreator'
import './css/NavigationBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export const NavigationBar = () => {

  const spaceDropDownItems = [
    { label: 'Space1', path: '/space' },
    { label: 'Space2', path: '/space' },
    { label: 'Space3', path: '/space' },
  ];

  return (

    <nav className="nav">

      <div className="nav-tabs">

        <Link to="/" className="noinfluence-title">
          Noinfluence
        </Link>

        <ul className="nav-list">

          <li><SpaceDropDown title="Space" items={spaceDropDownItems} /></li>
        </ul>
        
        <PageCreator orgName="myOrg" spaceName="mySpace"/>

        <SearchBar onSearch={(query) => console.log(query)} />
      </div>

      <div className="nav-profile">

        <ul className="nav-list">

          <LoginLink>
            <Link to="/login">Log In</Link>
          </LoginLink>

          <li><Link to="/profile">Profile</Link></li>

        </ul>
      </div>
    </nav>
  );
};