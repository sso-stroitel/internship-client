import React from 'react';
import './style.scss';

export const Input = ({label, name, onChange, value, style = {marginBottom: '25px'}, type='text', inputStyle}) => (
	<label className='label' style={style}>
		{label}
		<input style={inputStyle} onChange={onChange} value={value} type={type} name={name} className='input'/>
	</label>
);
