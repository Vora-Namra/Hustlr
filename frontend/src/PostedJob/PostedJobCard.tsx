import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

export const PostedJobCard = (props: any) => {
  const { id: selectedId } = useParams();
  const isSelected = props.id === selectedId;

  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={`rounded-xl p-2 border-l-2 ${isSelected 
        ? "bg-bright-sun-400 border-l-bright-sun-400 border-r-bright-sun-400 text-black"
        : "bg-mine-shaft-900 border-l-bright-sun-400 text-mine-shaft-300"}`}
    >
      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs">Posted {timeAgo(props.postTime)}</div>
    </Link>
  );
};

export default PostedJobCard;
