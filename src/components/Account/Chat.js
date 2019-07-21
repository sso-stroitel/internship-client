import React from 'react';
import axios from 'axios';
import {ROOT_API} from '../../services/constants';

export class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			messages: [...this.props.message.messages]
		}
	}

	onInputChange = ({target}) => {
		this.setState({
			text: target.value,
		});
	};

	onSubmit = (ev) => {
		ev.preventDefault();
		this.setState({
			messages: [...this.state.messages, {isMy: true, date: new Date(), text: this.state.text}],
			text: ''
		});
		this.axiosCancelSource = axios.CancelToken.source();
		const { message } = this.props;
		const self = this;
		axios.post(`${ROOT_API}message/post`, {
			email: message.from,
			message: self.state.text,
			recEmail: message.to,
			firstName: message.firstName,
			lastName: message.lastName,
			company: message.company
		}, {cancelToken: this.axiosCancelSource.token}).then(function (res) {
			console.log(res)
		}).catch(function (err) {
			console.log(err)
		})
	};

	getDate = (date) => {
		return `${new Date(date).getHours()}:${new Date(date).getMinutes()} ${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`
	};

	render() {
		const {message} = this.props;
		const name = this.props.isStudent ? message.company : message.firstName + ' ' + message.lastName;
		return (
			<div className='chat'>
				<div className="chat__name">{name}</div>
				<ul className='chat-mess'>
					{this.state.messages.sort(function (a, b) {
						return new Date(a.date) - new Date(b.date);
					}).map((mess, key) => (
						<div key={key} className={`${mess.isMy ? 'is-my' : ''} chat-mess__item`}>
							<div className="chat-mess__date">{this.getDate(mess.date)}</div>
							<div className="chat-mess__text">{mess.text}</div>
						</div>
					))}
				</ul>
				<form className='chat__form' onSubmit={this.onSubmit}>
					<input type='text' name='chat' value={this.state.text} onChange={this.onInputChange} className="chat__input"/>
					<button className='chat__btn' type='submit'>Отправить</button>
				</form>
			</div>
		)
	}
}