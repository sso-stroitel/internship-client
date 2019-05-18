import React from 'react';
import './style.scss';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

export default class Footer extends React.Component {
	render() {
		return (
			<div className='footer'>
				<div className="footer__wrapper container">
					<div className="footer__contacts">
						<Tooltip title="8 (800) 555-35-35" placement='top'>
							<div className="footer__phone"/>
						</Tooltip>
						<Tooltip title="placeholder@any.ru" placement='top'>
							<div className="footer__mail"/>
						</Tooltip>
					</div>
					<div className="footer__row">
						Политика конфиденциальности
						<div className="footer__social">
							<div className="footer__vk"/>
							<div className="footer__tw"/>
							<div className="footer__inst"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}