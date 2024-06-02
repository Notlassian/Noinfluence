import { Route, Routes } from 'react-router-dom';

import { NavigationBar, Callback } from './components';
import { Home, Space } from './pages';
import './App.css';

export default function App() {

  return (
    <div className="App">

      <NavigationBar />

      <div className="main-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:organisationName/:spaceName/*" element={<Space />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
      </div>
    </div>
  );
};
