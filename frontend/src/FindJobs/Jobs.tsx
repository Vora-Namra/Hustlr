
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
    <div className='flex flex-wrap  justify-center gap-10 mt-5'>
    {
      jobList.map((job,index)=><JobCard key={index} {...job}/>)
    }
    </div>
    </div>
  )
}

export default Jobs