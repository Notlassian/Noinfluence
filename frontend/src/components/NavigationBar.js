import React from 'react';
import { Link } from "react-router-dom";
import { LoginLink } from './authentication';
import { SpaceDropDown } from './SpaceDropDown';
import {PageCreator} from './PageCreator'
import './css/NavigationBar.css';

export const NavigationBar = () => {

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
        </ul>
      </div>
    </nav>
  );
};