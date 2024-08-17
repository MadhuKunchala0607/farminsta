import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Correct the import for CSS

const SearchPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  useEffect(() => {
    fetch('/contentCreators.json')
      .then(response => response.json())
      .then(data => {
        setProfiles(data);
        setFilteredProfiles(data); // Set both profiles and filteredProfiles initially
      });
  }, []); // Only run once when the component mounts

   // Re-run search when searchText or filterBy change

  const handleSearch = () => {
    const filtered = profiles.filter(profile => {
      const text = profile[filterBy]?.toLowerCase() || '';
      return text.includes(searchText.toLowerCase());
    });
    setFilteredProfiles(filtered);
  };

  return (
    <div className="search-page">
      <div className="top-bar">
        <h2>Search for creators</h2>
        
      </div>
      <div className="filters">
        <select onChange={(e) => setFilterBy(e.target.value)} value={filterBy}>
          <option value="name">Filter by Name</option>
          <option value="education">Filter by Education</option>
          <option value="specialization">Filter by Specialization</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="card-container">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="card">
            <img src={profile.image} alt={profile.name} className="card-image" />
            <div className="card-content">
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
              <p>Languages: {profile.languages.join(', ')}</p>
              <p>Education: {profile.education}</p>
              <p>Specialization: {profile.specialization}</p>
              <p>
                Social Media:
                <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer">Twitter</a> |
                <a href={profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </p>
              <Link to="/profile/:id" className="view-details-button">Creators page</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
