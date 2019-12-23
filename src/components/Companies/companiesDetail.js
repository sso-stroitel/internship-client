import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { city } from '../../services/jobData';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: '100%',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));

export default function CompaniesDetail({companies}) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const cityMap = Object.keys(city).reduce((acc, val, i)=>{
		acc[i] = val;
		return acc
	}, {});
	const filteredCompanies = companies.filter(company => company.city === cityMap[value]);
	return (
		<div className='companies-detail'>
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				{Object.values(city).map((el, i) =>
					(<Tab key={i} label={el} {...a11yProps(i)} />)
				)}
			</Tabs>
				<div className='companies-detail__list'>
					{filteredCompanies.map(el => <div>{el.company}</div>)}
				</div>
		</div>
		</div>
	);
}
