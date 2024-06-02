import React from "react";
import { SettingTable, SpaceSideNavigationBar } from "../components";
import './css/SpaceSetting.css';

export const SpaceSetting = () => {

  return (
    <div className="space-setting-container">

      <SpaceSideNavigationBar/>

      <SettingTable/>
    </div>
  );
};
