import MediaPlayerPanel from './MediaPlayerPanel';
import CalendarPanel from './CalendarPanel';
import NewFeaturePanel from './NewFeaturePanel';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      <div className="media-player-panel">
        <MediaPlayerPanel />
      </div>
      <div className="calendar-panel">
        <CalendarPanel />
      </div>
      <div className="new-feature-panel">
        <NewFeaturePanel />
      </div>
    </div>
  );
};

export default Dashboard;
