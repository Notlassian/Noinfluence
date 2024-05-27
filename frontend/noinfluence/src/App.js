import { Route, Routes } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import SideNavigationBar from "./components/SideNavigationBar";
import Home from "./pages/Home";
import Space from "./pages/Space";
import Profile from "./pages/Profile";
import './App.css';


export default function App() {
  return (
    <div className="App">

      <NavigationBar />
      <SideNavigationBar></SideNavigationBar>

      <div className="container">

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/space" element={<Space />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
