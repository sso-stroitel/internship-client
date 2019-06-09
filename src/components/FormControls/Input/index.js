import React from 'react';
import './style.scss';

export const Input = ({label, name, onChange, value, style = {marginBottom: '15px'}, type = 'text', inputStyle, disabled = false, validText=''}) => {
	return (
	<label className='label' style={style}>
		{label}
		<input disabled={disabled} style={inputStyle} onChange={onChange} value={value} type={type} name={name}
					 className='input'/>
		<span className="validation-text">{validText}</span>
	</label>
)};
