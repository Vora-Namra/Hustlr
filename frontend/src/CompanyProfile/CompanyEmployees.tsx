
import { jobList } from "../Data/JobsData"
import { talents } from "../Data/TalentData"
import JobCard from "../FindJobs/JobCard"
import TalentCard from "../FindTalent/TalentCard"

export const CompanyEmployees=()=>{
    return <div className="flex flex-wrap mt-5 gap-10">
    {talents.map((talent, index) =>index<6 && (
      <TalentCard key={index} {...talent} />
    ))}
  </div>
}
