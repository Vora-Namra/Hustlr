import { Sort } from './Sort';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../Services/JobService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../Slices/FilterSlice';

function Jobs() {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state:any)=>state.filter);
  const [filteredJobs,setFilteredJobs] = useState<any>([]);

  useEffect(() => {
    dispatch(resetFilter());
    getAllJobs().then((res) => {
        setJobList(res.filter((job: { jobStatus: string }) => job.jobStatus == 'ACTIVE'));
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
      });
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between mx-28 gap-5">
        <div className="text-xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {jobList.length > 0 ? (
          jobList.map((job, index) => {
            if (!job || typeof job !== 'object') return null; // Skip invalid job objects
            return <JobCard key={index} {...job} />;
          })
        ) : (
          <div>No jobs available.</div>
        )}
      </div>
    </div>
  );
}

export default Jobs;