import React from 'react';
import { companies } from "../Data/Data";
import Marquee from 'react-fast-marquee';

function Companies() {
  return (
    <div className='pb-5 mt-20'>
      <div className='text-center text-4xl font-semibold mb-10  text-mine-shaft-100'>
        Trusted by 100+ <span className='text-bright-sun-400'>Companies</span>
      </div>
      <Marquee pauseOnHover={true}>
        {companies.map((company, index) => (
          <div key={index} className='mx-8 px-2 py-1 hover:bg-mine-shaft-900 rounded-md cursor-pointer'>
            <img className='h-14' src={`/Companies/${company}.png`} alt={company} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Companies;
