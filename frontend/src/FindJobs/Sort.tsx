import { useState } from 'react';
import { Combobox, useCombobox, ActionIcon } from '@mantine/core';
import { IconAdjustments, IconFilter } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort, SORT_OPTIONS } from '../Slices/SortSlice';

// Define sorting options for both jobs and talents
const jobSortOptions = Object.values(SORT_OPTIONS);
const talentSortOptions = ['Relevance', 'Experience Low to High', 'Experience High to Low'] as const;

// Type for sort types
type SortType = 'job' | 'talent';

interface SortProps {
  sort: SortType;
  onFilterClick?: () => void;
  showFilterIcon?: boolean;
  className?: string;
}

export function Sort(props: SortProps) {
  const dispatch = useDispatch();
  
  // Set initial selected item based on sort type
  const initialSortValue = props.sort === 'job' 
    ? SORT_OPTIONS.RELEVANCE 
    : 'Relevance';
  
  const [selectedItem, setSelectedItem] = useState<string>(initialSortValue);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  // Get the appropriate options based on sort type
  const options = props.sort === "job" 
    ? jobSortOptions.map((item) => (
        <Combobox.Option 
          className='text-xs' 
          value={item} 
          key={item}
        >
          {item}
        </Combobox.Option>
      ))
    : talentSortOptions.map((item) => (
        <Combobox.Option 
          className='text-xs' 
          value={item} 
          key={item}
        >
          {item}
        </Combobox.Option>
      ));

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onFilterClick?.();
  };

  const handleOptionSubmit = (val: string) => {
    setSelectedItem(val);
    dispatch(updateSort(val));
    combobox.closeDropdown();
  };

  return (
    <div className={props.className}>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={handleOptionSubmit}
      >
        <Combobox.Target>
          <div 
            onClick={() => combobox.toggleDropdown()} 
            className='border border-bright-sun-400 cursor-pointer gap-2 xs-mx:text-xs xs-mx:px-1 xs-mx:py-0 text-sm flex items-center px-2 py-1 rounded-xl'
          >
            {selectedItem} 
            <ActionIcon 
              color="brightSun.4" 
              variant='transparent' 
              aria-label='Settings'
            >
              <IconAdjustments 
                style={{width:'70%',height:'70%'}} 
                stroke={1.5}
              />
            </ActionIcon>
            
            {/* Filter icon - Only show on mobile */}
            {props.showFilterIcon && (
              <ActionIcon 
                color="brightSun.4" 
                variant='transparent' 
                aria-label='Filter'
                onClick={handleFilterClick}
                className="md:hidden"
              >
                <IconFilter 
                  style={{width:'70%',height:'70%'}} 
                  stroke={1.5}
                />
              </ActionIcon>
            )}
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}