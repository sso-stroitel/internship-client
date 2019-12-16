import React from 'react';

export const CompaniesCard = ({title, img, count}) => (
	<div className='companies-card'>
		<div className="companies-card__img" style={{backgroundImage: `url(${img})`}} />
		<div className="companies-card__title">{title} {count ? <span>({count})</span> : ''}</div>
	</div>
);
