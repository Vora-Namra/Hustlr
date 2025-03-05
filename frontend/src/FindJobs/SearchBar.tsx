import { useState } from 'react';
import { MultiInput } from './MultiInput';
import { dropdownData } from '../Data/JobsData';
import { Divider, RangeSlider } from '@mantine/core';
import React from 'react';

function SearchBar() {
  const [value, setValue] = useState<[number, number]>([2, 100]);

  return (
    <div className="flex flex-col md:flex-row py-3 md:py-5 px-3 md:px-8 gap-3 md:gap-2">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-full md:w-1/5">
            <MultiInput options={item.options} title={item.title} icon={item.icon} />
          </div>
          {index < dropdownData.length - 1 && (
            <Divider size="xs" orientation="vertical" className="hidden md:block" />
          )}
        </React.Fragment>
      ))}
      <div className="w-full md:w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-xs md:text-sm justify-between">
          <div>Salary</div>
          <div>&#8377;{value[0]} Lpa - &#8377;{value[1]} Lpa</div>
        </div>
        <RangeSlider
          className="mt-1"
          size="xs"
          color="brightSun.4"
          value={value}
          onChange={setValue}
          labelAlwaysOn
        />
      </div>
    </div>
  );
}

export default SearchBar;