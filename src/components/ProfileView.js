import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProfileView = () => {
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

  // Dynamic banner image based on specialization
  const getBannerImage = (specialization) => {
    if (!specialization) return '/images/default-banner.jpg'; // Default image if specialization is undefined

    switch (specialization.toLowerCase()) {
      case 'video production':
        return '/images/video-production.jpg';
      case 'content writing':
        return '/images/content-writing.jpg';
      case 'graphic design':
        return '/images/graphic-design.jpg';
      default:
        return '/images/default-banner.jpg';
    }
  };

  return (
    <div className="profile-view">
      <img src={getBannerImage(profile.specialization)} alt="Banner" className="profile-banner" />
      <div className="profile-details">
        <h1>{profile.name}</h1>
        <p>Email: {profile.email}</p>
        <p>Description: {profile.description}</p>
        <p>Languages: {profile.languages}</p>
        <p>Education: {profile.education}</p>
        <p>Specialization: {profile.specialization}</p>
        <p>
          Social Media:
          <a href={profile.twitter} target="_blank" rel="noopener noreferrer"> Twitter </a> |
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer"> Instagram </a>
        </p>
        <Link to={`/edit-profile/${profile.id}`}>Edit Profile</Link>
      </div>
    </div>
  );
};

export default ProfileView;
