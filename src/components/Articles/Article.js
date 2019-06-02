import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

export const Article = (props) => {
	return (<div className='article'>
		<Header/>
		<div className="article__top" />
		<div className="article__body container">
		</div>
		<Footer/>
	</div>)
};
