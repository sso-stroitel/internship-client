import React from 'react';
import Header from '../Header'
import Footer from '../Footer';
import './style.scss';
import {articleData} from './articleData';

export const ArticleList = (props) => {
	return (<div className='article-list'>
		<Header {...props}/>
		<div className="article-list__body container">
			<div className="article-list__title">Статьи</div>
			<div className="article-list__grid">
				<div className="article-list__grid-col">
					<div className="article-list__grid-item">
						<div className="article-list__grid-img"
								 style={{backgroundImage: 'url("https://www.experience.com/wp-content/uploads/2018/06/StockSnap_72ZCJJ8K6I-741x486.jpg")'}}/>
						<div className="article-list__grid-name">Десять самых часто задаваемых вопросов на интервью</div>
					</div>
				</div>
				<div className="article-list__grid-col">
					<div style={{marginBottom: '10px'}} className="article-list__grid-item">
						<div className="article-list__grid-img"
								 style={{backgroundImage: 'url("https://www.experience.com/wp-content/uploads/2017/06/notes-macbook-study-conference-e1501776033145-1068x531.jpg")'}}/>
						<div className="article-list__grid-name">Правила структуризации резюме</div>
					</div>
					<div className="article-list__grid-item">
						<div className="article-list__grid-img"
								 style={{backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/07/31/11/46/people-2557585_960_720.jpg")'}}/>
						<div className="article-list__grid-name">Первая встреча с коллегами</div>
					</div>
				</div>
			</div>
			<div className="article-list__list">
				{articleData.map(article => (
					<div className="article-list__list-item">
						<div className="article-list__item-img" style={{backgroundImage: `url(${article.img})`}}>
							<div className="article-list__item-info">
								<div className="article-list__item-name">{article.title}</div>
								<div className="article-list__item-text">{article.text}</div>
								<div className="article-list__item-btn">Читать</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
		<Footer/>
	</div>)
};
