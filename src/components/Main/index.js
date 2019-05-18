import React from 'react';
import './style.scss';
import Filter from '../Filter';
import { newJobs } from './data'
import { Card } from '../Card';
import Header from '../Header';
import Footer from '../Footer';

export default class Main extends React.Component {
	render() {
		return <div>
			<Header/>
			<div className="main-top">
				<div className="container">
					<div className="main-top__title">Планирование карьеры</div>
					<div className="main-top__subtitle">Мост в профессиональную деятельность</div>
					<Filter/>
				</div>
			</div>
			<div className="main-bottom container">
				<div className="main-bottom__section">
					<div className="main-bottom__title">Новые вакансии</div>
					<div className="main-bottom__list">
						{newJobs.map((job, idx) => <Card key={idx} title={job.text} company={job.company} img={job.img}/>)}
						<div className="main-bottom__extra">Посмотреть еще</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	}
}