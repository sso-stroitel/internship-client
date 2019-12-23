import React from 'react';
import Header from '../Header'
import './style.scss';
import {PageTitle} from '../PageTitle/PageTitle';
import Footer from '../Footer';
import {area} from '../../services/jobData';
import {CompaniesCard} from './companiesCard';
import CompaniesDetail from './companiesDetail';
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
					img: companyImages[section],
					entities: []
				};
				return acc;
			}, {}),
			isDetailOpen: false,
			detailData: [],
			detailTitle: ''
		}
	}

	componentDidMount() {
		const self = this;
		const { sections } = this.state;
		axios.get(`${ROOT_API}get/employees`).then(function (res) {
			const sectionsCopy = {...sections};
			res.data.forEach(entity => {
				sectionsCopy[entity.area].entities.push(entity)
			})
			self.setState({sections: sectionsCopy})
		})
	}

	onCardClick = (e) => {
		const detailData = this.state.sections[e].entities;
		this.setState({
			isDetailOpen: true,
			detailData,
			detailTitle: e
		})
	}

	render() {
		return (
			<div className='companies'>
				<Header {...this.props} />
				<PageTitle title='Предприятия' />
				<div className="companies__wrap container">
					{this.state.isDetailOpen
						? <CompaniesDetail title={this.state.detailTitle} companies={this.state.detailData}/>
						: Object
							.entries(this.state.sections).map(([key, section], i) => (
								<CompaniesCard onCardClick={_ => this.onCardClick(key)} key={i} count={section.entities.length}
															 title={section.title} img={section.img}/>))
					}
				</div>
				<Footer />
			</div>
		)
	}
}

export default Companies;
