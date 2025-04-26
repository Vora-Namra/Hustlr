import { Sort } from './Sort';
import JobCard from './JobCard';
import { useEffect, useState, useMemo } from 'react';
import { getAllJobs } from '../Services/JobService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../Slices/FilterSlice';
import { resetSort, SORT_OPTIONS } from '../Slices/SortSlice';
import { Drawer } from '@mantine/core';
import SearchBar from './SearchBar';

function Jobs() {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const getSalaryValue = (job: any): number => {
    if (job.packageOffered === undefined || job.packageOffered === null) {
      return -1;
    }
    
    // Handle cases where packageOffered might be a string with "LPA" or similar
    const salaryStr = String(job.packageOffered).replace(/[^\d.]/g, '');
    const salary = Number(salaryStr);
    return isNaN(salary) ? -1 : salary;
  };

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    setIsLoading(true);
    
    getAllJobs()
      .then((res) => {
        const activeJobs = res.filter((job: { jobStatus: string }) => job.jobStatus === 'ACTIVE');
        setJobList(activeJobs);
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const filteredJobs = useMemo(() => {
    if (jobList.length === 0) {
      return [];
    }

    let jobs = [...jobList];

    // Apply filters
    if (filter["Job Title"]?.length > 0) {
      jobs = jobs.filter((job) =>
        filter["Job Title"].some((title: string) =>
          job.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location?.length > 0) {
      jobs = jobs.filter((job) =>
        filter.Location.some((location: string) =>
          job.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Experience?.length > 0) {
      jobs = jobs.filter((job) =>
        filter.Experience.some((exp: string) =>
          job.experience?.toLowerCase().includes(exp.toLowerCase())
        )
      );
    }
    if (filter["Job Type"]?.length > 0) {
      jobs = jobs.filter((job) =>
        filter["Job Type"].some((type: string) =>
          job.jobType?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
    
    // Apply salary filter if present
    if (filter.salary && Array.isArray(filter.salary) && filter.salary.length === 2) {
      const [minSalary, maxSalary] = filter.salary;
      
      jobs = jobs.filter(job => {
        const salary = getSalaryValue(job);
        return salary !== -1 && salary >= minSalary && salary <= maxSalary;
      });
    }

    // Apply sorting
    let sortedJobs = [...jobs];
    
    switch (sort) {
      case SORT_OPTIONS.MOST_RECENT:
        sortedJobs.sort((a, b) => {
          if (!a.postTime) return 1;  
          if (!b.postTime) return -1; 
          
          const dateA = new Date(a.postTime);
          const dateB = new Date(b.postTime);
          
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          
          return dateB.getTime() - dateA.getTime();
        });
        break;
        
      case SORT_OPTIONS.SALARY_LOW_HIGH:
        sortedJobs.sort((a, b) => {
          const salaryA = getSalaryValue(a);
          const salaryB = getSalaryValue(b);
          
          if (salaryA === -1 && salaryB === -1) return 0;
          if (salaryA === -1) return 1;
          if (salaryB === -1) return -1;
          
          return salaryA - salaryB;
        });
        break;
        
      case SORT_OPTIONS.SALARY_HIGH_LOW:
        sortedJobs.sort((a, b) => {
          const salaryA = getSalaryValue(a);
          const salaryB = getSalaryValue(b);
          
          if (salaryA === -1 && salaryB === -1) return 0;
          if (salaryA === -1) return 1;
          if (salaryB === -1) return -1;
          
          return salaryB - salaryA;
        });
        break;
        
      default:
        break;
    }

    return sortedJobs;
  }, [jobList, filter, sort]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap mx-4 md:mx-28 gap-5 xs-mx:justify-start">
        <div className="text-xl font-semibold xs-mx:text-lg">Recommended Jobs</div>
        <Sort 
          sort="job" 
          onFilterClick={() => setFilterDrawerOpen(true)} 
          showFilterIcon={true} 
        />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {isLoading ? (
          <div>Loading jobs...</div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <JobCard key={`${job.id}-${index}`} {...job} />
          ))
        ) : (
          <div>No jobs available matching your criteria.</div>
        )}
      </div>

      <Drawer
        opened={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        size="xs"
        position="right"
        title="Filters"
      >
        <SearchBar />
      </Drawer>
    </div>
  );
}

export default Jobs;