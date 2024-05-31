import { Route, Routes } from 'react-router-dom';

import { NavigationBar, Callback } from './components';
import { Home, Space, Profile } from './pages';
import './App.css';

export default function App() {

  return (
    <div className="App">

      <NavigationBar />

      <div className="main-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space" element={<Space />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
      </div>
    </div>
  );
};
