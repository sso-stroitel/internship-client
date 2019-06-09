import React from 'react';
import './style.scss';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom'
import { logout } from '../../store/actions/auth';
import {connect} from 'react-redux'

class Header extends React.Component {
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

	onSignOut = (e) => {
		e.preventDefault();
		this.props.logout();
		this.props.history.push("/");
	};

	render() {
		const { currentUser, styles } = this.props;
		let company;
		if (currentUser.user) {
			company = currentUser.user.company;
		}
		const btn = currentUser.isAuthenticated
			?	<div className='header__account'><div className="header__signout" onClick={this.onSignOut}>Выйти</div><Link to={company ? '/company/' : '/student/'}><div className="header__edit">Личный кабинет</div></Link></div>
			: <div className="header__login" onClick={this.onToggle}>{this.state.sidebarOpen ? 'Закрыть' : 'Войти'}</div>;
		return <div className='header' style={styles}>
			<div className="container">
				<Link to='/'><div className="header__logo" /></Link>
				<Link to='/articles'>
					<div className="header__item">Полезные статьи</div>
				</Link>
				<div className="header__item">Образовательные учреждения</div>
				{btn}
				<Sidebar {...this.props} isOpen={this.state.sidebarOpen}/>
			</div>
		</div>
	}
}

export default connect(null, { logout })(Header);
