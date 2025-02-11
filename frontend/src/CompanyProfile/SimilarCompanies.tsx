
import { similar } from "../Data/Company"
import { talents } from "../Data/TalentData"
import TalentCard from "../FindTalent/TalentCard"
import { CompanyCard } from "./CompanyCard"

export const SimilarCompanies=()=>{
    return <div className="w-1/4">
        <div className='text-xl font-semibold mx-auto mt-5 '>
            Similar Companies 
            <div className='flex flex-col flex-wrap  gap-5'>
                {
                    similar.map((company,index)=><CompanyCard key={index} {...company}/>)
                }
            </div>
        </div>
        </div>
}
