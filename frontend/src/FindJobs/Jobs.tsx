import { Sort } from './Sort';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../Services/JobService';

function Jobs() {
  const [jobList, setJobList] = useState<any[]>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        console.log('Fetched Jobs:', res); // Debugging step
        // Normalize data: Ensure applicants is always an array
        const normalizedJobs = Array.isArray(res)
          ? res.map((job) => ({
              ...job,
              applicants: job.applicants || [], // Default to empty array if null/undefined
            }))
          : [];
        setJobList(normalizedJobs);
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