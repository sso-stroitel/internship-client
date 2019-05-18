import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, withStyles, OutlinedInput} from '@material-ui/core/'
import {data} from './data';

const style = () => ({
	formControl: {
		minWidth: 170,
		maxWidth: 170,
	},
});

const FilterSelect = (props) => {
	const {classes, name} = props;
	return <FormControl variant='outlined' className={classes.formControl}>
		<InputLabel htmlFor="select-multiple">{name}</InputLabel>
		<Select
			multiple
			value={[]}
			input={
				<OutlinedInput
					labelWidth={170}
					name="age"
					id="outlined-age-simple"
				/>}
		>
			{data.map((name, idx) => (
				<MenuItem key={idx} value={name}>
					{name}
				</MenuItem>
			))}
		</Select>
	</FormControl>
};

export default withStyles(style, { withTheme: true })(FilterSelect);