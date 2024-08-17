import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    description: '',
    languages: '',
    education: '',
    specialization: '',
    twitter: '',
    instagram: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/contentCreators.json');
        const data = await response.json();
        const profileData = data.find(item => item.id === id);
        setProfile(profileData || {});
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSave = () => {
    // Save updated profile to local storage or backend
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile updated!');
    navigate(`/profile/${profile.id}`);
  };

  return (
    <div className="profile-edit">
      <h2>Edit Profile</h2>
      <form>
        <input 
          type="text" 
          name="name" 
          value={profile.name} 
          onChange={handleChange} 
          placeholder="Name" 
        />
        <input 
          type="email" 
          name="email" 
          value={profile.email} 
          onChange={handleChange} 
          placeholder="Email" 
        />
        <textarea 
          name="description" 
          value={profile.description} 
          onChange={handleChange} 
          placeholder="Description"
        />
        <input 
          type="text" 
          name="languages" 
          value={profile.languages} 
          onChange={handleChange} 
          placeholder="Languages (comma separated)" 
        />
        <input 
          type="text" 
          name="education" 
          value={profile.education} 
          onChange={handleChange} 
          placeholder="Education" 
        />
        <input 
          type="text" 
          name="specialization" 
          value={profile.specialization} 
          onChange={handleChange} 
          placeholder="Specialization" 
        />
        <input 
          type="text" 
          name="twitter" 
          value={profile.twitter} 
          onChange={handleChange} 
          placeholder="Twitter URL" 
        />
        <input 
          type="text" 
          name="instagram" 
          value={profile.instagram} 
          onChange={handleChange} 
          placeholder="Instagram URL" 
        />
        <button type="button" onClick={handleSave}>Save</button>
        <p><Link to={`/profile/${profile.id}`}>Back to Profile</Link></p>
      </form>
    </div>
  );
};

export default ProfileEdit;
