
import { useParams } from 'react-router-dom';
import TalentCard from '../FindTalent/TalentCard'

function RecommendTalent(props:any) {
  const {id} = useParams();
  return (
    <div className='text-xl font-semibold mx-auto mt-5 '>
        Recommended Talent 
        <div className='flex flex-col flex-wrap  mt-5 gap-5'>
            {
                props?.talents?.map((talent:any,index:any)=> index<4 && id!= talent.id &&<TalentCard key={index} {...talent} />)
            }
        </div>
    </div>
  )
}

export default RecommendTalent;