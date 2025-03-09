import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile } from "../Services/ProfileService";

const Skills = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  // Initialize skills with profile data or empty array if not available
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditToggle = () => {
    if (!edit) {
      setSkills(profile?.skills || []); // Load skills when entering edit mode
    }
    setEdit(!edit);
  };

  // Handle Save
  const handleSave = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      // Create updated profile object
      const updatedProfile = { ...profile, skills };
      
      // Send update to backend
      const response = await updateProfile(updatedProfile);
      
      // Update Redux state with response
      dispatch(setProfile(response));
      
      successNotification("Success", "Skills Updated Successfully.");
      setEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to add error notification here
    } finally {
      setLoading(false);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setSkills(profile?.skills || []); // Reset to original skills
    setEdit(false);
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills{" "}
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
            onClick={edit ? handleCancel : handleEditToggle} // Cancel if editing, else toggle edit
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          label="Press Enter to submit a tag"
          placeholder="Add skill"
          splitChars={[",", " ", "|"]}
          disabled={loading}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.length > 0 ? (
            profile.skills.map((s: string, index: number) => (
              <div
                key={index}
                className="bg-bright-sun-400 text-sm font-semibold bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
              >
                {s}
              </div>
            ))
          ) : (
            <span className="text-gray-500">No skills added yet</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;