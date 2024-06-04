import { HomeDashboard, HomeSideNavigationBar } from '../components';
import './css/Home.css';

export const Home = () => {

  const updatedSpaces = ['Space 1', 'Space 2', 'Space 3'];
  const updatedFolders = ['Folder 1', 'Folder 2', 'Folder 3'];
  const updatedPages = ['Page 1', 'Page 2', 'Page 3'];

  return (
    <div className='home-container'>

      <HomeSideNavigationBar/>

      <HomeDashboard updatedSpaces={updatedSpaces} updatedFolders={updatedFolders} updatedPages={updatedPages} />
    </div>
  );
};