import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import {gridArticles, listArticles} from './articleData';

export const Article = (props) => {
	const articles = props.isGrid ? gridArticles : listArticles;
	const {id} = props.match.params;
	return (<div className='article'>
		<Header {...props}/>
		<div className="article__top" style={{backgroundImage: `url(${articles[id-1].img})`}}/>
		<div className="article__body container">
			<div className="article__title">{articles[id-1].title}</div>
			<div className="article__text" dangerouslySetInnerHTML={{__html: articles[id-1].text}} />
		</div>
		<Footer/>
	</div>)
};
