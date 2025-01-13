
import TalentCard from '../FindTalent/TalentCard'
import { talents } from '../Data/TalentData'

function RecommendTalent() {
  return (
    <div className='text-xl font-semibold mx-auto mt-5 '>
        Recommended Talent 
        <div className='flex flex-col flex-wrap  mt-5 gap-5'>
            {
                talents.map((talent,index)=>index<4 && <TalentCard key={index} {...talent} />)
            }
        </div>
    </div>
  )
}

export default RecommendTalent;