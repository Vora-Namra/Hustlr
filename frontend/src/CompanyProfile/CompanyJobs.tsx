import { jobList } from "../Data/JobsData"
import JobCard from "../FindJobs/JobCard"

export const CompanyJobs=()=>{
    return <div className='flex flex-wrap  justify-center gap-3 mt-5'>
    {
      jobList.map((job,index)=><JobCard key={index} {...job}/>)
    }
    </div>
}