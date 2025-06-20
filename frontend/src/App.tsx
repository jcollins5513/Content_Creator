import { useState } from 'react';
import Dashboard from './components/Dashboard';
import MediaSelector from './components/MediaSelector';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectorComplete = (category: string | null) => {
    setSelectedCategory(category ?? 'All');
  };
  return (
    <div className="App">
      <>
        <Dashboard />
        {selectedCategory === null && (
          <MediaSelector onComplete={handleSelectorComplete} />
        )}
      </>
    </div>
  );
}

export default App;
