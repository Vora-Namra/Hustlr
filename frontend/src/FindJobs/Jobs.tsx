
import { Sort } from './Sort'
import JobCard from './JobCard'
import { jobList } from '../Data/JobsData'

function Jobs() {
  return (
    <div className='p-5'>
    <div className='flex justify-between mx-28 gap-5'>
        <div className='text-xl font-semibold '> Recommended Jobs</div>
        <Sort/>
        
    </div>
    <div className='flex flex-wrap mt-5 gap-5 ml justify-center'>
    {
      jobList.map((job,index)=><JobCard key={index} {...job}/>)
    }
    </div>
    </div>
  )
}

export default Jobs