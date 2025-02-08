import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const About = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  
  // Initialize state with profile.about if available
  const [about, setAbout] = useState(profile?.about || "");
  const [edit, setEdit] = useState(false);

  // Handle Save
  const handleSave = () => {
    setEdit(false);
    dispatch(setProfile({ ...profile, about })); // Update Redux state
    successNotification("Success","About Updated Successfully.")
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About{" "}
        <div>
          {edit && (
            <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={() => {
              setEdit(!edit);
              if (!edit) setAbout(profile.about || ""); // Reset if canceled
            }}
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
            variant="subtle"
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
