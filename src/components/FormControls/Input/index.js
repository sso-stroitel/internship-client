import React from 'react';
import './style.scss';

export const Input = ({label, name, onChange, value, style = {marginBottom: '30px'}, type='text'}) => (
	<label className='label' style={style}>
		{label}
		<input onChange={onChange} value={value} type={type} name={name} className='input'/>
	</label>
);
