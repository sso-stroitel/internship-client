import React from 'react';
import './style.scss';
import Sidebar from './Sidebar';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: false
		}
	}

	onToggle = () => {
		this.setState(prevState => ({
			sidebarOpen: !prevState.sidebarOpen
		}))
	};

	render() {
		return <div className='header'>
			<div className="container">
				<div className="header__item">Полезные статьи</div>
				<div className="header__item">Образовательные учреждения</div>
				<div className="header__login" onClick={this.onToggle}>{this.state.sidebarOpen ? 'Закрыть' : 'Войти'}</div>
				<Sidebar isOpen={this.state.sidebarOpen}/>
			</div>
		</div>
	}
}