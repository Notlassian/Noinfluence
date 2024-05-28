import { Route, Routes } from "react-router-dom";

import { NavigationBar, SideNavigationBar } from "./components";
import { Home, Space, Profile } from "./pages";
import './App.css';


export default function App() {
  return (
    <div className="App">

      <NavigationBar />

      <div className="container">
        <SideNavigationBar
          sideNavBarItem={[
            ["Organisation1","/dot.png"],
            ["Organisation2","/dot.png"],
          ]}/>


        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/space" element={<Space />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
