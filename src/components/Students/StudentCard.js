import React from 'react';

export const StudentCard = (props) => {
	const { firstName, lastName, year, studyPlace, spec, photo } = props.student;
	return (
		<div className='student-card'>
			<div className="student-card__photo" style={{backgroundImage: `url(${photo})`}}/>
			<div className="student-card__info">
				<div className="student-card__name">{firstName} {lastName}</div>
				<div className="student-card__study">{studyPlace}</div>
				<div className="student-card__spec">{spec}</div>
				<div className="student-card__year">{year}</div>
			</div>
			<div className="student-card__download" onClick={(e) =>props.click(e, props.student.email)}/>
		</div>
	)
};
