import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, withStyles, OutlinedInput} from '@material-ui/core/'

const style = () => ({
	formControl: {
		minWidth: 170,
		maxWidth: 170,
	},
	wideFormControl: {
		minWidth: '100%',
		maxWidth: '170%',
		marginBottom: 30
	}
});

const FilterSelect = (props) => {
	const {classes, name, title, data, value, onSelectChange, isWide = false, mult=true, disabled=false} = props;
	const values = Array.isArray(value) ? value : [value];
	return <FormControl disabled={disabled} variant='outlined' className={!isWide ? classes.formControl : classes.wideFormControl}>
		<InputLabel htmlFor="select-multiple">{title}</InputLabel>
		<Select
			onChange={onSelectChange}
			multiple={mult}
			value={values}
			input={
				<OutlinedInput
					labelWidth={170}
					name={name}
				/>}
		>
			{Object.entries(data).map(([key, value], idx) => (
				<MenuItem key={idx} value={key}>
					{value}
				</MenuItem>
			))}
		</Select>
	</FormControl>
};

export default withStyles(style, { withTheme: true })(FilterSelect);
