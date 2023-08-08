import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { Controller } from "react-hook-form";

export const CustomAutocomplete = ({ control, name, label, error, placeholder, options, values, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          id={name}
          size='small'
          sx={{ mt: .5 }}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          options={options ? options : []}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={label}/>
          )}
          {...rest}
        />
      )} 
      />
  )
}