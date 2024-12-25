import { talents } from "../Data/TalentData"
import { Sort } from "../FindJobs/Sort"
import TalentCard from "./TalentCard"

function Talents() {
    return (
      <div className="p-5">
        <div className="flex justify-between mx-32 gap-5">
          <div className="text-2xl font-semibold">Talents</div>
          <Sort />
        </div>
        <div className="flex flex-wrap mt-5 gap-5 ml justify-center">
          {talents.map((talent, index) => (
            <TalentCard key={index} {...talent} />
          ))}
        </div>
      </div>
    );
  }
  
  export default Talents;
  