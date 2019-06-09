import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, withStyles, OutlinedInput} from '@material-ui/core/'

const style = () => ({
	formControl: {
		minWidth: 170,
		maxWidth: 170,
	},
});

const FilterSelect = (props) => {
	const {classes, name, title, data, value, onSelectChange, mult=true} = props;
	const values = Array.isArray(value) ? value : [value];
	return <FormControl variant='outlined' className={classes.formControl}>
		<InputLabel htmlFor="select-multiple">{title}</InputLabel>
		<Select
			onChange={onSelectChange}
			multiple
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