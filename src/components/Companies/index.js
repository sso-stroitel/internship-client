import React from 'react';
import Header from '../Header'
import './style.scss';
import {PageTitle} from '../PageTitle/PageTitle';
import Footer from '../Footer';
import {area} from '../../services/jobData';
import {CompaniesCard} from './companiesCard';
import { companyImages } from './companyImages'
import axios from 'axios';
import {ROOT_API} from '../../services/constants';

class Companies extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sections: Object.keys(area).reduce((acc, section) => {
				acc[section] = {
					title: area[section],
					img: companyImages[section]
				};
				return acc;
			}, {})
		}
	}

	componentDidMount() {
		axios.get(`${ROOT_API}get/employees`).then(function (res) {
			console.log(res)
		})
	}

	render() {
		return (
			<div className='companies'>
				<Header {...this.props} />
				<PageTitle title='Предприятия' />
				<div className="companies__wrap container">
					{Object.values(this.state.sections).map((section, i) => (<CompaniesCard key={i} title={section.title} img={section.img}/>))}
				</div>
				<Footer />
			</div>
		)
	}
}

export default Companies;
