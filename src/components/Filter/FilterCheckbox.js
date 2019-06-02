import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export const FilterCheckbox = ({label, name, onCheckChange, checked}) => (
	<FormControlLabel
		style={{'marginRight': '0'}}
		control={
			<Checkbox
				style={{'paddingRight': '6px'}}
				onChange={onCheckChange(name)}
				value={name}
				checked={checked}
				color='primary'
			/>
		}
		label={label}
	/>
)