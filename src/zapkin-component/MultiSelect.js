import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { makeStyles } from '@mui/styles' // Import makeStyles from @mui/styles

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 240,
    '@media (max-width: 600px)': {
      width: '124px',
    },
  },
  select: {
    height: '36px',
  },
}))

export default function MultipleSelectCheckmarks({
  serviceSelectionHandler,
  value,
  list,
}) {
  const classes = useStyles()

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="services-multiple-checkbox-label" size="small">
          Services{' '}
        </InputLabel>
        <Select
          labelId="services-multiple-checkbox-label"
          id="servicesemo-multiple-checkbox"
          multiple
          value={value}
          onChange={serviceSelectionHandler}
          input={<OutlinedInput label="Services" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          className={classes.select}
        >
          {list.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                style={{ color: 'rgb(56 189 248)' }}
                checked={value.indexOf(name) > -1}
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
