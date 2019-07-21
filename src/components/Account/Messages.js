import React from 'react';
import {messages} from './data';
import axios from 'axios';
import {ROOT_API} from '../../services/constants';
import {apiCall} from '../../services/api';
import {Loader} from '../Loader';
import {Chat} from './Chat';
import './style.scss';

export default class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			isChat: {}
		}
	}

	componentDidMount = () => {
		const self = this;
		this.axiosCancelSource = axios.CancelToken.source();
		axios.post(`${ROOT_API}message/get`, {email: this.props.currentUser.user.email}, {cancelToken: this.axiosCancelSource.token}).then(function (res) {
			self.setState({
				messages: res.data
			})
		}).catch(function (err) {
			console.log(err)
		})
	};

	onMessageClick = message => e => {
		this.axiosCancelSource = axios.CancelToken.source();
		axios.post(`${ROOT_API}message/read`, {email: this.props.currentUser.user.email, recEmail: message.from}, {cancelToken: this.axiosCancelSource.token}).then(function () {
			console.log('SUCCESS');
		}).catch(function (err) {
			console.log(err);
		});
		this.setState({
			isChat: message
		})
	};

	render() {
		const {messages} = this.state;
		let msgs;
		if (messages.length) {
			msgs = messages.sort(function (a, b) {
				return new Date(b.created) - new Date(a.created);
			})
				.reduce((acc, message) => {
					const isMy = this.props.currentUser.user.email === message.from;
					acc[isMy ? message.to : message.from] = {
						from: message.from,
						to: message.to,
						firstName: message.firstName,
						lastName: message.lastName,
						company: message.company,
						isRead: message.isRead,
						messages: acc[isMy ? message.to : message.from] ? [...acc[isMy ? message.to : message.from].messages, {
							text: message.text,
							isMy: isMy,
							date: message.created
						}] : [{text: message.text, date: message.created, isMy: isMy,}],
						date: message.created,
						created: new Date(message.created).getDate() + '.' + (new Date(message.created).getMonth() + 1) + '.' + new Date(message.created).getFullYear()
					};
					return acc
				}, {});
		}
		return (<div className='account__messages'>
			<ul>
				{msgs ? Object.keys(this.state.isChat).length ? <Chat message={this.state.isChat}  {...this.props}/> : Object.values(msgs).map((message, key) => (
					<li onClick={this.onMessageClick(message)} className={`${message.isRead ? '' : 'not-read'} account__message`}
							key={key}>
						<span
							className='account__company'>{this.props.isStudent ? message.company : message.firstName + ' ' + message.lastName}</span><span
						className='account__text'>{message.messages.slice(-1)[0].text}</span><span
						className='account__date'>{message.created}</span>
					</li>
				)) : <Loader/>}
			</ul>
		</div>)
	}
}