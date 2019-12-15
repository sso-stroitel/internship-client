import React from 'react';

export const EducationCard = ({card}) => (
	<div className='education-card'>
		<div className="education-card__header">
			<div className="education-card__img" style={{backgroundImage: `url(${card.image})`}}/>
			<div className="education-card__main">
				<div className="education-card__name">{card.name}</div>
				<div className="education-card__name">{card.jurAddress}</div>
			</div>
		</div>
	</div>
);
