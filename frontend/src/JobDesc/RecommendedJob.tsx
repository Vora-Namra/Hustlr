import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";

export const RecommendedJobs = () => {
  // Initialize as an empty array instead of null
  const [jobList, setJobList] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => { 
    getAllJobs()
      .then((res) => {
        // Ensure we store an array
        setJobList(Array.isArray(res) ? res : []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="text-xl font-semibold mx-auto mt-5">Recommended Talent</div>
      <div className="flex flex-col flex-wrap gap-5 justify-between">
        {jobList.length > 0
          ? jobList.map((job: any, index: number) =>
              index < 6 && id !== job.id ? <JobCard key={index} {...job} /> : null
            )
          : <div>No jobs available.</div>}
      </div>
    </div>
  );
};
