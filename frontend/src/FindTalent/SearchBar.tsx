import React, { useState } from 'react';
import { Divider, Input, RangeSlider } from '@mantine/core';
import { MultiInput } from '../FindJobs/MultiInput';
import { searchFields } from '../Data/TalentData';
import { IconUserCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';
import { useMediaQuery } from '@mantine/hooks';
import { Collapse, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function SearchBar() {
  const matches = useMediaQuery('(max-width: 475px)');
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState('');

  const handleChange = (name: string, event: any) => {
    if (name === "exp") {
      dispatch(updateFilter({ exp: event }));
      setValue(event);
    } else if (name === "name") {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
  };

  return (
    <div>
      <div>
        {matches && (
          <Button
            onClick={toggle}
            variant='outline'
            autoContrast
            color='brightSun.4'
            className='flex justify-end'
            m="sm"
            radius={'lg'}
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>
      <Collapse in={opened || !matches}>
        <div className="flex flex-col md:flex-row py-3 md:py-5 px-4 md:px-8 gap-4 md:gap-2">
          {/* Talent Name Input */}
          <div className="w-full md:w-1/4 flex items-center">
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2 flex-shrink-0">
              <IconUserCircle className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <Input
              value={name}
              onChange={(e) => handleChange("name", e)}
              className="w-full [&_input]:placeholder:text-mine-shaft-300 [&_input]:text-sm md:[&_input]:text-base"
              variant="unstyled"
              placeholder="Talent Name"
            />
          </div>

          {/* Search Fields */}
          <div className="flex flex-col md:flex-row flex-1 gap-4 md:gap-2">
            {searchFields.map((item, index) => (
              <React.Fragment key={index}>
                <div className="w-full md:w-1/4">
                  <MultiInput
                    options={item.options}
                    title={item.title}
                    icon={item.icon}
                  />
                </div>
                {index < searchFields.length - 1 && (
                  <Divider
                    size="xs"
                    orientation="vertical"
                    className="hidden md:block"
                  />
                )}
              </React.Fragment>
            ))}

            {/* Experience Range Slider */}
            <div className="w-full md:w-1/4 [&_.mantine-Slider-label]:!translate-y-10">
              <div className="flex text-xs md:text-sm justify-between">
                <div>Experience</div>
                <div>{value[0]} - {value[1]} Years</div>
              </div>
              <RangeSlider
                className="mt-1"
                size="xs"
                color="brightSun.4"
                value={value}
                min={0}
                max={50}
                onChange={(val) => setValue(val)}
                onChangeEnd={(val) => handleChange("exp", val)}
                labelAlwaysOn
              />
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default SearchBar;