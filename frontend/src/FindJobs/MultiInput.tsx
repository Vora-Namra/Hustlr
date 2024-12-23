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
  const [data, setData] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  useEffect(() => {
    // Initialize dropdown data
    setData(options);
  }, [options]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');

    if (val === '$create') {
      // Add a new item and select it
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
    } else {
      // Toggle selection
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      );
    }
  };

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values =
    value.length <= 1 ? (
      value.map((item) => (
        <Pill
          key={item}
          withRemoveButton
          onRemove={() => handleValueRemove(item)}
          className="bg-bright-sun-400 text-mine-shaft-900"
        >
          {item}
        </Pill>
      ))
    ) : (
      <>
        <Pill key={value[0]} className="bg-bright-sun-400 text-mine-shaft-900">
          {value[0]}
        </Pill>
        <Pill>+{value.length - 1} more</Pill>
      </>
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
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={title || placeholder} // Display `title` as placeholder
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
