import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileView from './components/ProfileView';
import ProfileEdit from './components/ProfileEdit';
import SearchPage from './components/SearchPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        <Route path="/edit-profile/:id" element={<ProfileEdit />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
