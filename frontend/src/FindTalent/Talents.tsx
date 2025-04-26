import { useEffect, useState, useMemo } from "react";
import { Sort } from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

function Talents() {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    setIsLoading(true);

    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const filteredTalents = useMemo(() => {
    if (talents.length === 0) return [];

    let filtered = [...talents];

    // Apply filters
    if (filter.name) {
      filtered = filtered.filter((talent) =>
        talent.name?.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter["Job Title"]?.length > 0) {
      filtered = filtered.filter((talent) =>
        filter["Job Title"].some((title: string) =>
          talent.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location?.length > 0) {
      filtered = filtered.filter((talent) =>
        filter.Location.some((location: string) =>
          talent.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Skills?.length > 0) {
      filtered = filtered.filter((talent) =>
        filter.Skills.every((skill: string) =>
          talent.skills?.some((talentSkill: string) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // ✅ Experience Filter
    if (filter.exp && Array.isArray(filter.exp) && filter.exp.length === 2) {
      const [minExp, maxExp] = filter.exp;
      filtered = filtered.filter((talent) => {
        const experience = parseFloat(talent.totalExp) || 0;
        return experience >= minExp && experience <= maxExp;
      });
    }

    return filtered;
  }, [talents, filter]);

  const sortedTalents = useMemo(() => {
    if (filteredTalents.length === 0) return [];

    let sorted = [...filteredTalents];

    switch (sort) {
      case "Experience Low to High":
        sorted.sort((a, b) => (parseFloat(a.totalExp) || 0) - (parseFloat(b.totalExp) || 0));
        break;
      case "Experience High to Low":
        sorted.sort((a, b) => (parseFloat(b.totalExp) || 0) - (parseFloat(a.totalExp) || 0));
        break;
      case "Relevance":
      default:
        // No special sorting, keep as API returns
        break;
    }

    return sorted;
  }, [filteredTalents, sort]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap mx-4 md:mx-28 gap-5 xs-mx:justify-start">
        <div className="text-xl font-semibold xs-mx:text-lg">Available Talents</div>
        <Sort sort="talent" />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {isLoading ? (
          <div>Loading talents...</div>
        ) : sortedTalents.length > 0 ? (
          sortedTalents.map((talent, index) => (
            <TalentCard key={`${talent.id}-${index}`} {...talent} />
          ))
        ) : (
          <div>No talents available matching your criteria.</div>
        )}
      </div>
    </div>
  );
}

export default Talents;
