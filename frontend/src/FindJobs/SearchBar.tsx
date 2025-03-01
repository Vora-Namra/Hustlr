
import { useState } from 'react';
import { MultiInput } from './MultiInput';
import { dropdownData } from '../Data/JobsData';
import { Divider, RangeSlider } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 100]);
  const handleChange=(event:any)=>{
      dispatch(updateFilter({salary:event}))
    }
  return (
    <div className="flex py-5 px-8 gap-2">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput options={item.options} title={item.title} icon={item.icon} />
          </div>
          <Divider size="xs" orientation="vertical" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>&#8377;{value[0]} Lpa - &#8377;{value[1]} Lpa</div>
        </div>
        <RangeSlider className="mt-1" color="brightSun.4" value={value}
          max={100}
          min={0}
          onChangeEnd={handleChange}
          onChange={setValue}
          step={1}
        />
      </div>
    </div>
  );
}

export default SearchBar;
