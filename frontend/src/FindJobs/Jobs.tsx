import { Sort } from './Sort';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../Services/JobService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../Slices/FilterSlice';
import { resetSort } from '../Slices/SortSlice';

function Jobs() {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state:any)=>state.filter);
  const sort=useSelector((state:any)=>state.sort);
  const [filteredJobs,setFilteredJobs] = useState<any>([]);

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllJobs().then((res) => {
        setJobList(res.filter((job: { jobStatus: string }) => job.jobStatus == 'ACTIVE'));
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
      });
  }, []);

  useEffect(()=>{
    if(sort=="Most Recent"){
      setJobList([...jobList].sort((a:any,b:any)=>new Date(b.postTime).getTime()-new Date(a.createdAt).getTime()));
    }else if(sort=="Salary (Low to High)"){
      setJobList(jobList.sort((a:any,b:any)=>a.packageOffered-b.packageOffered));
    }
    else if(sort=="Salary (High to Low)"){
      setJobList(jobList.sort((a:any,b:any)=>b.packageOffered-a.packageOffered));
    }
    
  },[sort]);
  useEffect(() => {
    let filterjob = jobList;
    console.log(filter);
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterjob = filterjob.filter((job: any) =>
        filter["Job Title"].some((title: any) =>
          job.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      filterjob = filterjob.filter((job: any) =>
        filter.Location.some((location: any) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Experience && filter.Experience.length > 0) {
      filterjob = filterjob.filter((job: any) =>
        filter.Experience?.some((skill: any) =>
          job.experience?.toLowerCase().includes(skill.toLowerCase())
          )
        )
    }

    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filterjob = filterjob.filter((job: any) =>
        filter["Job Type"].some((type: any) =>
          job.jobType.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if(filter.salary && filter.salary.length>0){
      filterjob = filterjob.filter((jobs:any)=>filter.salary[0]<=jobs.packageOffered && jobs.packageOffered<=filter.salary[1]);
    }
    
    setFilteredJobs(filterjob);
  }, [filter, jobList]);



  return (
    <div className="p-5">
      <div className="flex justify-between mx-28 gap-5">
        <div className="text-xl font-semibold">Recommended Jobs</div>
        <Sort sort="job" />
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {jobList.length > 0 ? (
          filteredJobs.map((job:any, index:any) => {
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