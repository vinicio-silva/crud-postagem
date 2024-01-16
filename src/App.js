import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostListing from './pages/PostListing';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PostListing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;