import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export const FilterCheckbox = ({label}) => (
	<FormControlLabel
		style={{'marginRight': '0'}}
		control={
			<Checkbox
				style={{'paddingRight': '6px'}}
				value="checkedA"
				color='primary'
			/>
		}
		label={label}
	/>
)