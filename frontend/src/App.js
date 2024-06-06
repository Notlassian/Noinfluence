import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components';
import { Home, Space, Page, SpaceSetting, OrganisationSetting, Unauthenticated, Callback } from './pages';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
            <Route path="/unauthorized" element={<Unauthenticated />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </div>

      <ToastContainer />
    </div>
  );
};
