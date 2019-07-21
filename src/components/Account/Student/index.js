import React from 'react';
import './style.scss';
import Header from '../../Header';
import Footer from '../../Footer';
import Editor from './Editor';
import Messages from '../Messages';

export default class AccountStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'profile',
		}
	}

	onViewChange = ({target}) => {
		this.setState( ({
			view: target.value
		}))
	};

	render() {
		const view = this.state.view === 'profile'
			? <Editor {...this.props}/>
			: <Messages isStudent={true} {...this.props}/>;
		return (<div className='account'>
				<Header {...this.props} styles={{boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)'}}/>
				<div className="container account__container">
					<div className="account__header">
						<label className={`account__header-item ${this.state.view === 'profile' ? 'active' : ''}`}>
							Мой профиль
							<input type='radio' name='toggle' value="profile" onClick={this.onViewChange} />
						</label>
						<label className={`account__header-item ${this.state.view === 'messages' ? 'active' : ''}`}>
							Мои сообщения
							<input type='radio' name='toggle' value="messages" onClick={this.onViewChange} />
						</label>
					</div>
					{view}
				</div>
				<Footer/>
			</div>
		)
	}
}