import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, withStyles, OutlinedInput} from '@material-ui/core/'

const style = () => ({
	formControl: {
		minWidth: 170,
		maxWidth: 170,
	},
});

const FilterOneSelect = (props) => {
	const {classes, name, title, data, value, onSelectChange} = props;
	return <FormControl variant='outlined' className={classes.formControl}>
		<InputLabel htmlFor="select-multiple">{title}</InputLabel>
		<Select
			onChange={onSelectChange}
			value={value}
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

export default withStyles(style, { withTheme: true })(FilterOneSelect);