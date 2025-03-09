import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile } from "../Services/ProfileService";

const About = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
    
  // Initialize state with profile.about if available
  const [about, setAbout] = useState(profile?.about || "");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Save
  const handleSave = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      // Create updated profile object
      const updatedProfile = { ...profile, about };
      
      // Send update to backend
      const response = await updateProfile(updatedProfile);
      
      // Update Redux state with response
      dispatch(setProfile(response));
      
      successNotification("Success", "About Updated Successfully.");
      setEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to add error notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About{" "}
        <div>
          {edit && (
            <ActionIcon 
              onClick={handleSave} 
              size="lg" 
              color="green.8" 
              variant="subtle"
              loading={loading}
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={() => {
              setEdit(!edit);
              if (!edit) setAbout(profile?.about || ""); // Reset if canceled
            }}
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
            variant="subtle"
            disabled={loading}
          >
            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
          </ActionIcon>
        </div>
      </div>
      
      {edit ? (
        <Textarea
          autosize
          minRows={3}
          placeholder="Enter about yourself"
          value={about}
          onChange={(event) => setAbout(event.target.value)}
          disabled={loading}
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about ? profile.about : "No about info available"}
        </div>
      )}
    </div>
  );
};

export default About;