import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";

function CertiCard(props: any) {
  return (
    <div className="flex justify-between items-center bg-mine-shaft-900 p-3 rounded-lg">
      {/* Left Side: Certificate Details */}
      <div className="flex gap-3 items-center">
        {/* Certificate Logo */}
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img
            className="h-7"
            src={`/Icons/${props.issuer}.png`}
            onError={(e) => (e.currentTarget.src = "/Icons/default.png")}
            alt={props.issuer}
          />
        </div>
        {/* Certificate Info */}
        <div className="flex flex-col">
          <div className="font-semibold text-white">{props.name}</div>
          <div className="text-sm text-gray-400">{props.issuer}</div>
        </div>
      </div>

      {/* Right Side: Date, ID & Delete Button */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-400 flex flex-col items-end">
          <div>{formatDate(props.issueDate) || "N/A"}</div>
          <div>{props.certificateId || "N/A"}</div>
        </div>

        {/* Delete Button (Only in Edit Mode) */}
        {props.edit && (
          <ActionIcon size="lg" color="red.8" variant="subtle" onClick={props.onDelete}>
            <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
}

export default CertiCard;
