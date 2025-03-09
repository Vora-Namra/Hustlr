import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpCard from "./ExpCard";

const Experiences = () => {
  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  // Toggle Edit Mode
  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <div className="flex gap-2">
            {/* Add Experience Button */}
            <ActionIcon
              onClick={() => setAddExp(true)}
              size="lg"
              color="brightSun.4"
              variant="subtle"
            >
              <IconPlus className="h-4/5 w-4/5" />
            </ActionIcon>

            {/* Edit/Save Button */}
            <ActionIcon
              onClick={handleClick}
              size="lg"
              color={edit ? "red.8" : "brightSun.4"}
              variant="subtle"
            >
              {edit ? (
                <IconX className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>

        {/* Experience List */}
        <div className="flex flex-col gap-8">
          {(profile?.experiences ?? []).map((exp: any, index: number) => (
            <ExpCard key={index} index={index} {...exp} edit={edit} />
          ))}

          {/* New Experience Form */}
          {addExp && <ExpCard add setEdit={setAddExp} />}
        </div>
      </div>
    </>
  );
};

export default Experiences;