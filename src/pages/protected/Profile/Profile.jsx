import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileService } from '@/services/profileService';
import ProfileForm from '@/components/profile/ProfileForm';
import AvatarUpload from '@/components/profile/AvatarUpload';
import { User } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (formData) => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (avatarData) => {
    try {
      profileService.uploadAvatar(avatarData);
      // Refresh user data
      updateProfile({ avatar: avatarData });
    } catch (error) {
      console.error('Avatar upload failed:', error);
    }
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <span className="text-[#C4954A]">Home</span>
        <span style={{ color: '#7A7468' }}>/</span>
        <span style={{ color: '#1C1A17' }}>Profile</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <User size={28} style={{ color: '#C4954A' }} />
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1C1A17' }}>
          My Profile
        </h1>
      </div>

      {/* Profile Content */}
      <div className="bg-white p-6 rounded-sm border border-[#D0C9BA]">
        {/* Avatar Upload */}
        <div className="border-b border-[#D0C9BA] pb-6 mb-6">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1C1A17' }}>
            Profile Picture
          </h2>
          <AvatarUpload
            user={user}
            onUpload={handleAvatarUpload}
            isLoading={isLoading}
          />
        </div>

        {/* Profile Form */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1C1A17' }}>
            Personal Information
          </h2>
          <ProfileForm
            user={user}
            onSubmit={handleUpdateProfile}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;