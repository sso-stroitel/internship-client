import React from 'react';
// import {Input} from '../FormControls/Input'
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			showError: false,
		}
	}

	onSubmit = (ev) => {
		ev.preventDefault();
		const data = {
			email: this.state.email,
			password: this.state.pass,
		};
		const authType = this.props.signUp ? "signup" : "signin";
		this.props
			.onAuth(authType, data)
			.then(() => {
				this.props.history.push("/");
				window.location.reload()
				this.setState({showError: false})
			})
			.catch(() => {
				if (this.props.errors.message.status === 400) {
					this.setState({showError: true})
				}
			});
	};

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	render() {
		return <div className={`sidebar ${this.props.isOpen ? 'is-open' : ''}`}>
			<form onSubmit={this.onSubmit}>
				<div className={this.state.showError ? 'show-error' : 'show-error-hidden'}>Неправильный email или пароль</div>
				<TextField label='Email' onChange={this.onInputChange} value={this.state.email} style={{color: '#fff', marginBottom: '30px', fontSize: '18px', width: '100%'}} name='email'/>
				<TextField label='Пароль' type='password' onChange={this.onInputChange} value={this.state.pass} style={{color: '#fff', marginBottom: '30px', fontSize: '18px', width: '100%'}} name='pass'/>
				<button type='submit' className='login'>Войти</button>
			</form>
			<h2 className='reg-question'>Еще нет аккаунта?</h2>
			<Link to='/signup/'>
				<button className='reg'>Регистрация</button>
			</Link>
		</div>
	}
}
