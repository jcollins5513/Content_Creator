import MediaPlayerPanel from './MediaPlayerPanel';
import CalendarPanel from './CalendarPanel';
import NewFeaturePanel from './NewFeaturePanel';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="panel glass-panel media-player-panel">
          <MediaPlayerPanel />
        </div>
        <div className="panel glass-panel calendar-panel">
          <CalendarPanel />
        </div>
        <div className="panel glass-panel new-feature-panel">
          <NewFeaturePanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
