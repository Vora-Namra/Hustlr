import { ActionIcon } from "@mantine/core";
import { IconPlus, IconPencil, IconX, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import { CertiInput } from "./CertiInput";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Certification = () => {
  const [addCerti, setAddCerti] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  // 🔥 Delete Certification
  const handleDelete = (index: number) => {
    let updatedCertifications = [...profile.certifications];
    updatedCertifications.splice(index, 1); // Remove the certification

    dispatch(changeProfile({ ...profile, certifications: updatedCertifications }));
    successNotification("Success", "Certification removed successfully");
  };

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-4 flex justify-between">
        Certifications
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => setAddCerti(true)}
            size="lg"
            color="brightSun.4"
            variant="subtle"
          >
            <IconPlus className="w-4/5 h-4/5" stroke={1.5} />
          </ActionIcon>
          <ActionIcon onClick={toggleEdit} variant="subtle" color={edit ? "red.8" : "brightSun.4"} size="lg">
            {edit ? <IconX className="w-4/5 h-4/5" stroke={1.5} /> : <IconPencil className="w-4/5 h-4/5" stroke={1.5} />}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.certifications?.map((certi: any, index: number) => (
          <CertiCard key={index} edit={edit} {...certi} onDelete={() => handleDelete(index)} />
        ))}
        {addCerti && <CertiInput setEdit={setAddCerti} />}
      </div>
    </div>
  );
};

export default Certification;
