import React from 'react';
import './style.scss';

export const Card = (props) => (
	<div className='card' onClick={props.onCardClick}>
		<div className="card__logo-wrap">
			<img className="card__logo" src={props.img}/>
		</div>
		<div className="card__company">{props.company}</div>
		<div className="card__title">{props.title}</div>
	</div>
)