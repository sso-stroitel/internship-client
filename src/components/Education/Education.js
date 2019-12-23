import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import {PageTitle} from '../PageTitle/PageTitle';
import './style.scss';
import {colleges, universities} from './EducationData';
import {EducationCard} from './EducationCard';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
	return {
		id: `nav-tab-${index}`,
		'aria-controls': `nav-tabpanel-${index}`,
	};
}

function LinkTab(props) {
	return (
		<Tab
			component="a"
			onClick={event => {
				event.preventDefault();
			}}
			{...props}
		/>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#408CDD',
		// backgroundColor: theme.palette.background.paper,
	},
}));

export const Education = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const collegesArr = colleges.reduce((acc, val, i) => [...acc, {...val, id: i}], []);
	const universitiesArr = universities.reduce((acc, val, i) => [...acc, {...val, id: i}], []);
	const cards = value !== 0
		? collegesArr.map(card => <EducationCard card={card} key={card.id} />)
		: universitiesArr.map(card => <EducationCard card={card} key={card.id} />);
	return (<div className='education'>
		<Header {...props}/>
		<PageTitle title='Образовательные организации'/>
		<div className="container education-cards__wrap">
			<AppBar position="static" className={classes.root}>
				<Tabs
					variant="fullWidth"
					value={value}
					onChange={handleChange}
					aria-label="nav tabs example"
				>
					<LinkTab label="Высшее Профессиональное Образование" {...a11yProps(0)} />
					<LinkTab label="Среднее Профессиональное Образование" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<div className='education-cards'>
				{cards}
			</div>
		</div>
		<Footer/>
	</div>)
};
