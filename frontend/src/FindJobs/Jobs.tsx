import { Sort } from './Sort';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../Services/JobService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../Slices/FilterSlice';
import { resetSort } from '../Slices/SortSlice';
import { Drawer } from '@mantine/core';

function Jobs() {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state:any)=>state.filter);
  const sort=useSelector((state:any)=>state.sort);
  const [filteredJobs,setFilteredJobs] = useState<any>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
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
  
  // This would be your filter component that appears in the drawer
  const FilterComponent = () => {
    // Add your filter component logic here
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        {/* Your filter components would go here */}
      </div>
    );
  };
  
  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap mx-4 md:mx-28 gap-5 xs-mx:justify-start">
        <div className="text-xl font-semibold xs-mx:text-lg">Recommended Jobs</div>
        
        {/* Sort component that will handle sorting */}
        <Sort 
          sort="job" 
          onFilterClick={() => setFilterDrawerOpen(true)} 
          showFilterIcon={true} 
        />
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
      
      {/* Mobile Filter Drawer */}
      <Drawer
        opened={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        size="xs"
        position="right"
        title="Filters"
      >
        <FilterComponent />
      </Drawer>
    </div>
  );
}

export default Jobs;