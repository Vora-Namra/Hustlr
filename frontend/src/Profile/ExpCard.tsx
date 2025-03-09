import { Button } from "@mantine/core";
import { useState } from "react";
import { ExpInput } from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile } from "../Services/ProfileService";

function ExpCard(props: any) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(props.add || false); // Open edit mode if adding new experience
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      // Remove the experience at the given index
      let exp = [...profile.experiences];
      exp.splice(props.index, 1);
      
      // Create updated profile object
      const updatedProfile = { ...profile, experiences: exp };
      
      // Send update to backend
      const response = await updateProfile(updatedProfile);
      
      // Update Redux state with response from backend
      dispatch(changeProfile(response));
      
      successNotification("Success", "Experience Deleted Successfully");
      // Close edit mode
      props.setEdit(false);
    } catch (error) {
      console.error("Error deleting experience:", error);
      // You might want to add error notification here
    } finally {
      setLoading(false);
    }
  };
  
  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              onError={(e) => (e.currentTarget.src = "/Icons/default.png")}
              alt={props.company}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm">
              {props.company} &bull; {props.location || "Remote"}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {formatDate(props.startDate)} -{" "}
          {props.working || !props.endDate ? "Present" : formatDate(props.endDate)}
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">{props.description}</div>
      {props.edit && (
        <div className="flex gap-5">
          <Button 
            onClick={() => setEdit(true)} 
            color="brightSun.4" 
            variant="outline"
            disabled={loading}
          >
            Edit
          </Button>
          <Button 
            color="red.8" 
            onClick={handleDelete} 
            variant="light"
            loading={loading}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
}

export default ExpCard;