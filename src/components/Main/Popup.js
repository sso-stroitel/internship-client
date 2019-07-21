import React from 'react';
import axios from 'axios';
import {ROOT_API} from '../../services/constants';

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
			isResponseOpen: false
		}
	}

	onResponse = () => {
		this.setState({
			isResponseOpen: true
		})
	};

	onResponseChange = ({target}) => {
		this.setState({
			response: target.value
		})
	};

	onSubmit = (e) => {
		this.axiosCancelSource = axios.CancelToken.source();
		e.preventDefault();
		const self = this;
		axios.post(`${ROOT_API}message/post`, {
			email: self.props.currentUser.user.email,
			message: this.state.response,
			recEmail: this.props.data.email,
			firstName: self.props.currentUser.user.firstName,
			lastName: self.props.currentUser.user.lastName,
			company: this.props.data.company
		}, {cancelToken: this.axiosCancelSource.token}).then(function (res) {
			self.setState({
				response: ''
			})
		}).catch(function (err) {
			console.log(err)
		})
	};

	render() {
		const {onClose, data, currentUser} = this.props;
		const isAuthUser = currentUser.user.email;
		return (
			<div
				className='main-bottom__section'
			>
				<div onClick={onClose} className='main-popup__return'>
					Вернуться к списку вакансий
				</div>
				<div className='main-popup__title'>{data.name}</div>
				<div className='main-popup__description' dangerouslySetInnerHTML={{__html: data.description}}>
				</div>
				{this.state.isResponseOpen ?
					<form onSubmit={this.onSubmit} className='main-popup__response'>
						<textarea placeholder='Здравствуйте, заинтересовала ваша вакансия, расскажите пожалуйста подробнее...' value={this.state.response} onChange={this.onResponseChange} name="response" cols="30" rows="10"
											className='main-popup__text'/>
						<button type='submit' className='main-popup__submit'>Отправить</button>
					</form>
					: isAuthUser ? <div className='main-popup__submit' onClick={this.onResponse}>
						Откликнуться
					</div> : <p style={{color: 'red'}}>Необходимо пройти авторизацию, чтобы откликнуться</p>}
			</div>
		)
	}
}

export default Popup;