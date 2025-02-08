import { Button } from "@mantine/core";
import { useState } from "react";
import { ExpInput } from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import Experiences from "./Experiences";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

function ExpCard(props: any) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(props.add || false); // Open edit mode if adding new experience
  const profile = useSelector((state:any)=>state.profile);
  const handleDelete = () => {
    let exp = [...profile.experiences]; // Copy experiences array
    exp.splice(props.index, 1); // Remove the experience at the given index
  
    let updatedProfile = { ...profile, experiences: exp }; // Use lowercase "experiences"
  
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Experience Deleted Successfully");
    // Dispatch the updated profile
    props.setEdit(false); // Close edit mode
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
          <Button onClick={() => setEdit(true)} color="brightSun.4" variant="outline">
            Edit
          </Button>
          <Button color="red.8" onClick={handleDelete} variant="light">Delete</Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
}

export default ExpCard;
