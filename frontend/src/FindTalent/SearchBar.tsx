import React, { useState } from 'react';
import { Divider, Input, RangeSlider } from '@mantine/core';
import { MultiInput } from '../FindJobs/MultiInput';
import { searchFields } from '../Data/TalentData';
import { IconUserCircle } from '@tabler/icons-react';
import { updateFilter } from '../Slices/FilterSlice';
import { useDispatch } from 'react-redux';

function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name,setName] = useState('');
  const handleChange=(name:any,event:any)=>{
    if(name=="exp"){
      dispatch(updateFilter({exp:event}))
    }else{
      dispatch(updateFilter({name:event.target.value}));
    setName(event.target.value);
    }
  }
  return (
    <div className="flex py-5 px-8 gap-2">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input defaultValue={name} onChange={(e)=>handleChange("name",e)}
          className="[&_input]:placeholder:text-mine-shaft-300"
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput options={item.options} title={item.title} icon={item.icon} />
          </div>
          <Divider size="xs" orientation="vertical" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Experiences (Years)</div>
          <div>
            {value[0]} - {value[1]} 
          </div>
        </div>
        <RangeSlider
          className="mt-1"
          size="xs"
          color="brightSun.4"
          value={value}
          max={50}
          min={0}
          onChangeEnd={(e)=>handleChange("exp",e)}
          onChange={setValue}
          step={1}
          minRange={1}
        />
      </div>
    </div>
  );
}

export default SearchBar;
