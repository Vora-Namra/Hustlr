import  { useState } from 'react';
import { MultiInput } from './MultiInput';
import { dropdownData } from '../Data/JobsData';
import { Divider, RangeSlider } from '@mantine/core';

function SearchBar() {
  const [value, setValue] = useState<[number, number]>([2, 100]);
  return (
    <div className="flex py-5 px-8 gap-2">
      {dropdownData.map((item, index) => (
       <> <div key={index} className="w-1/5">
          <MultiInput options={item.options} title={item.title} icon={item.icon} />
        </div>
        
        <Divider size="xs" orientation='vertical'/>
        </>
      ))}
      <div className='w-1/5 [&_.mantine-Slider-label]:!translate-y-10'>
      <div className='flex text-sm justify-between'>
        <div>Salary </div>
        <div>&#8377;{value[0]} Lpa  -  &#8377;{value[1]} Lpa</div>
      </div>
      <RangeSlider className='mt-1' size="xs" color='brightSun.4' value={value} onChange={setValue} />
      </div>
    </div>
  );
}

export default SearchBar;