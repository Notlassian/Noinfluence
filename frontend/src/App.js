import { Route, Routes } from 'react-router-dom';

import { NavigationBar, Callback } from './components';
import { Home, Space, Page, SpaceSetting } from './pages';
import './App.css';

export default function App() {

  return (
    <div className="App">

      <NavigationBar />

      <div className="main-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space" element={<Space />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/page" element={<Page />} />
            <Route path="/spaceSetting" element={<SpaceSetting />} />
          </Routes>
      </div>
    </div>
  );
};
