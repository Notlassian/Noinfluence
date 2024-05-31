import { SpaceDashboard, SpaceSideNavigationBar } from "../components";
import './css/Space.css';

export const Space = () => {

  const description = 'This space is to demostrate';
  const openIssues = ['Issue 1', 'Issue 2', 'Issue 3'];
  const openIssuesNum = 4;
  const completedIssuesNum = 7;

  const sideNavBarItem = [
    ['page1','./dot.png'],
    ['page2','./dot.png'],
  ];

  return (
    <div className="space-container">
      <SpaceSideNavigationBar
        sideNavBarItem={sideNavBarItem}
        />
      <SpaceDashboard
        description={description}
        openIssues={openIssues}
        openIssuesNum={openIssuesNum}
        completedIssuesNum={completedIssuesNum} />
    </div>

  );
};