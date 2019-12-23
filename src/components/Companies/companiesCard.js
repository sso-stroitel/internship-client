import React from 'react';

export const CompaniesCard = ({title, img, count, onCardClick}) => (
	<div className='companies-card' onClick={onCardClick}>
		<div className="companies-card__img" style={{backgroundImage: `url(${img})`}} />
		<div className="companies-card__title">{title} <span>({count ? count : '0'})</span></div>
	</div>
);
