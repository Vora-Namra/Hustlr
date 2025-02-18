import React, { useEffect, useState } from 'react';
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';

interface MultiInputProps {
  options: string[]; // Array of dropdown options
  placeholder?: string; // Optional placeholder text
  title: string; // Title to display as placeholder
  icon?: React.ElementType; // Optional icon component
}

export function MultiInput({
  options,
  title,
  placeholder = '',
  icon: Icon = IconSearch, // Default to IconSearch if not provided
}: MultiInputProps) {
  const [data, setData] = useState<string[]>(options);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);
  const dispatch = useDispatch();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  useEffect(() => {
    // Initialize dropdown data
    setData(options);
  }, [options]);

  const exactOptionMatch = data.includes(search);

  const handleValueSelect = (val: string) => {
    setSearch('');
    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({ [title]: [...value, search] }));
    } else {
      const newValue = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      setValue(newValue);
      dispatch(updateFilter({ [title]: newValue }));
    }
  };

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v) => v !== val);
    setValue(newValue);
    dispatch(updateFilter({ [title]: newValue }));
  };

  const values =
    value.length > 1 ? (
      <>
        <Pill
          key={value[0]}
          withRemoveButton
          onRemove={() => handleValueRemove(value[0])}
          className="bg-bright-sun-400 text-mine-shaft-900"
        >
          {value[0].length >= 10 ? `${value[0].substring(0, 8)}..` : value[0]}
        </Pill>
        <Pill className="bg-bright-sun-400 text-mine-shaft-900">
          +{value.length - 1} more
        </Pill>
      </>
    ) : (
      value.map((item) => (
        <Pill
          key={item}
          withRemoveButton
          onRemove={() => handleValueRemove(item)}
          className="bg-bright-sun-400 text-mine-shaft-900"
        >
          {item.length >= 10 ? `${item.substring(0, 8)}..` : item}
        </Pill>
      ))
    );

  const optionsList = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={value.includes(item)}
        className={`hover:bg-bright-sun-400 hover:text-mine-shaft-900 ${
          value.includes(item) ? 'bg-bright-sun-400 text-mine-shaft-900' : ''
        }`}
      >
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          onClick={() => combobox.openDropdown()}
          variant="unstyled"
          rightSection={<IconSelector />}
          leftSection={
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
              <Icon />
            </div>
          }
        >
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                aria-label={title}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={title || placeholder} 
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
                className="text-bright-sun-400"
                style={{ minWidth: '100px' }} // Ensure the field reserves space for the placeholder
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className="bg-mine-shaft-900">
        <Combobox.Options>
          {optionsList}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create" className="text-bright-sun-400">
              + Create {search}
            </Combobox.Option>
          )}
          {exactOptionMatch && search.trim().length > 0 && optionsList.length === 0 && (
            <Combobox.Empty className="text-bright-sun-400">
              Nothing found
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
