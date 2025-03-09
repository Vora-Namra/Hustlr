import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { getProfile } from "../Services/ProfileService";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Removed mockData as it was causing confusion with real data

  const handleProfileUpdate = (updatedProfile: any) => {
    // Dispatch the updated profile to Redux
    dispatch(setProfile(updatedProfile));
  };

  useEffect(() => {
    // Fetch the profile data when the component mounts
    if (user?.profileId) {
      setLoading(true);
      setError(null);
      
      getProfile(user.profileId)
        .then((data) => {
          handleProfileUpdate(data);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setError("Failed to load profile data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.profileId, dispatch]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <Divider mx="md" mb="xl" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
};