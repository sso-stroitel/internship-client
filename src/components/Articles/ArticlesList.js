import React from 'react';
import Header from '../Header'
import Footer from '../Footer';
import './style.scss';
import {gridArticles, listArticles} from './articleData';
import {Link} from 'react-router-dom';

export const ArticleList = (props) => {
	return (<div className='article-list'>
		<Header {...props}/>
		<div className="article-list__body container">
			<div className="article-list__title">Статьи</div>
			<div className="article-list__grid">
				{gridArticles.map(article => (
					<Link to={`/articles/grid/${article.id}/`} className="article-list__grid-item" key={article.id}>
						<div className="article-list__grid-img"
								 style={{backgroundImage: `url(${article.img})`}}/>
						<div className="article-list__grid-name">{article.title}</div>
					</Link>))}
			</div>
			<div className="article-list__list">
				{listArticles.map(article => (
					<div className="article-list__list-item" key={article.id}>
						<div className="article-list__item-img" style={{backgroundImage: `url(${article.img})`}}>
						</div>
						<div className="article-list__item-info">
							<div className="article-list__item-name">{article.title}</div>
							<div className="article-list__item-text">{article.text}</div>
							<Link to={`/articles/list/${article.id}/`} className="article-list__item-btn">Читать</Link>
						</div>
					</div>
				))}
			</div>
		</div>
		<Footer/>
	</div>)
};
