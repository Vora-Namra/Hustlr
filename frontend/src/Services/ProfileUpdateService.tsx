import { updateProfile } from './ProfileService';
import { changeProfile } from '../Slices/ProfileSlice';
import { successNotification, errorNotification } from './NotificationService';

export const handleProfileUpdate = async (dispatch: any, updatedProfile: any, successMessage: string) => {
  try {
    // First update the backend
    const savedProfile = await updateProfile(updatedProfile);
    
    // If successful, update Redux state
    dispatch(changeProfile(savedProfile));
    
    // Show success notification
    successNotification("Success", successMessage);
    
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    errorNotification("Error", "Failed to update profile. Please try again.");
    return false;
  }
}; 