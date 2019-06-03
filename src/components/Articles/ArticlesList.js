import React from 'react';
import Header from '../Header'
import Footer from '../Footer';
import './style.scss';

export const ArticleList = (props) => {
	return (<div className='article-list'>
			<Header {...props}/>
			<div className="article-list__body container">
				<div className="article-list__title">Статьи</div>
				<div className="article-list__grid">
					<div className="article-list__grid-col">
						<div className="article-list__grid-item">
							<div className="article-list__grid-name"/>
						</div>
					</div>
					<div className="article-list__grid-col">
						<div className="article-list__grid-item">
							<div className="article-list__grid-name"/>
						</div>
						<div className="article-list__grid-item">
							<div className="article-list__grid-name"/>
						</div>
					</div>
				</div>
				<div className="article-list__list">
					<div className="article-list__list-item">
						<div className="article-list__item-img"/>
						<div className="article-list__item-info">
							<div className="article-list__item-name"/>
							<div className="article-list__item-text"/>
							<div className="article-list__item-btn">Читать</div>
						</div>
					</div>
					<div className="article-list__list-item"></div>
					<div className="article-list__list-item"></div>
				</div>
			</div>
			<Footer/>
		</div>
	)
};