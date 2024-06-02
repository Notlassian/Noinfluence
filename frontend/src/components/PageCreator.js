import React from 'react';
import {Popup, } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./PageCreator.css"

export const PageCreator = () => {
  const navigateTo = (args) => {
    alert(args)
  }
  var orgName = "my org"
  var spaceName = "my space"
  return (
    <Popup
      trigger={<button className="button"> Create Page </button>}
      position="bottom center"
      closeOnDocumentClick
    >
      <div className="menu">
        <h4> Org Name: </h4>
        <text> {orgName} </text>
        <h4> Space Name: </h4>
        <text> {spaceName} </text>
        <h4> Page Name: </h4>
        <input></input>
        <button class="buttom" onClick={() => navigateTo('/createpage')}>Create</button>
      </div>
    </Popup>
  );
}