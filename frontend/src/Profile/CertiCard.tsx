import { ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconTrack, IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";

function CertiCard(props: any) {
    return (
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.issuer}.png`}
              onError={(e) => (e.currentTarget.src = '/Icons/default.png')}
              alt={props.issuer}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.name}</div>
            <div className="text-sm">{props.issuer}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
        <div className="text-sm text-mine-shaft-300 flex flex-col items-end">
          <div>{formatDate(props.issueDate) || "N/A"}</div>
          <div>{props.certificateId || "N/A"}</div>
         {props.edit&&<ActionIcon size="lg" color="red.8" variant="subtle">
             <IconTrash className="h-4/5 w-4/5" stroke={1.5}/>
        </ActionIcon>}
        </div>
        </div>
      </div>
    );
  }
  
  export default CertiCard;
  