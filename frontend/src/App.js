import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationBar, Callback } from './components';
import { Home, Space, Page, SpaceSetting, OrganisationSetting } from './pages';
import './App.css';

export default function App() {

  return (

    <div className="App">

      <NavigationBar />

      <div className="main-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:orgName/settings" element={<OrganisationSetting />} />
            <Route path="/:orgName/:spaceName" element={<Space />} />
            <Route path="/:orgName/:spaceName/settings" element={<SpaceSetting />} />
            <Route path="/:orgName/:spaceName/:folderName/:pageName" element={<Page />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </div>
    </div>
  );
};
