import React from 'react';
import './style.scss';
import Filter from '../Filter';
import {Card} from '../Card';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import connect from 'react-redux/es/connect/connect';
import {dispatchFilter} from '../../store/actions/filter';
import {Popup} from './Popup';
import {Loader} from '../Loader';

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			jobs: [],
			headSpecs: [],
			isPopupOpen: false,
			popupData: {},
			extendBtn: false
		}
	}

	componentDidMount = () => {
		const self = this;
		axios.get('https://blooming-earth-65020.herokuapp.com/get/jobs').then(function (res) {
			self.setState({
				jobs: res.data
			})
		}).catch(function (err) {
			console.log(err)
		})
	}

	onFilter(filter) {
		if (!filter.filter) {
			return this.state.jobs
		}
		return this.state.jobs.reduce((acc, job) => {
			const {data} = filter.filter;
			const date = new Date();
			const postDate = {
				one: date.setDate(date.getDate() - 1),
				three: date.setDate(date.getDate() - 3),
				week: date.setDate(date.getDate() - 7)
			};
			if ((data.area.includes(job.area) || !data.area.length)
				&& (data.spec.includes(job.spec) || !data.spec.length)
				&& (data.city.includes(job.city) || !data.city.length)) {
				if (job.description.includes(data.text) || job.name.includes(data.text)) {
					if (!(data.full || data.part || data.flex || data.remote)
						|| (data.full && sched.full === job.schedule)
						|| (data.part && sched.part === job.schedule)
						|| (data.flex && sched.flex === job.schedule)
						|| (data.remote && sched.remote === job.schedule)) {
						if (!(data.salary.length)
							|| (data.salary && data.salary.includes(Math.round(job.salary/10000) + ''))
					&& (!data.created || new Date(job.created) > postDate[data.created])) {
							acc.push(job)
						}
					}
				}
			}
			return acc
		}, [])
	}

	onHeadSpecs = ({target}) => {
		this.setState(({
			headSpecs: target.checked ? [...this.state.headSpecs, target.value] : this.state.headSpecs.filter(val => val !== target.value)
		}))
	};

	onCardClick = (data) => {
		this.setState({
			isPopupOpen: true,
			popupData: data
		});
	};

	onPopupClose = () => {
		this.setState({
			isPopupOpen: false
		})
	};

	onCallBack = () => {
		console.log('click')
	};

	onExtendClick = () => {
		this.setState({
			extendBtn: true
		})
	};

	render() {
		const {dispatchFilter, filter} = this.props;
		let filteredData = this.onFilter(filter);
		filteredData = filteredData.filter(job => (this.state.headSpecs.includes(job.spec) || !this.state.headSpecs.length));
		if (filteredData.length > 8 && !this.state.extendBtn) {
			filteredData = filteredData.slice(0, 7);
		}
		return <div>
			<Header {...this.props}/>
			<div className="main-top">
				<div className="container">
					<div className="main-top__title">Планирование карьеры</div>
					<div className="main-top__subtitle">Мост в профессиональную деятельность</div>
					<Filter onHeadSpecs={this.onHeadSpecs} filterAction={dispatchFilter}/>
				</div>
			</div>
			<div className="main-bottom container">
				{this.state.jobs.length
				? <div className="main-bottom__section">
						<div className="main-bottom__title">Новые вакансии</div>
						<div className="main-bottom__list">
							{filteredData.map((job, idx) => <Card onCardClick={() =>this.onCardClick(job)} key={idx} title={job.name} company={job.company}
																										img={job.companyImg}/>)}
							{filteredData.length < 8 && !this.state.extendBtn ? <div onClick={this.onExtendClick} className="main-bottom__extra">Посмотреть еще</div> : ''}
						</div>
					</div>
				: <Loader />}
				<Popup isOpen={this.state.isPopupOpen} onSubmit={this.onCallBack} data={this.state.popupData} onClose={this.onPopupClose}/>
			</div>
			<Footer/>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		filter: state.filter,
	};
}

export default connect(mapStateToProps, {dispatchFilter})(Main)