import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectProps = {
  initial_value: string,
  currencies_list: {},
  setState: (state: string) => void
};

const Select_item: React.FC<SelectProps> = ({ currencies_list, initial_value, setState }) => {

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <FormControl id="id" sx={{ minWidth: 120 }} size="small">
      <Select
        value={initial_value}
        onChange={handleChange}
      >
        {Object.keys(currencies_list).map((currency, i) => {
          return <MenuItem key={i} value={currency}>{currency}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
};

export default Select_item;