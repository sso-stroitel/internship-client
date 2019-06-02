import React from 'react';
import {Input} from '../FormControls/Input'
import { Link } from 'react-router-dom';


export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: ''
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
			})
			.catch(() => {
				return;
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
				<Input label='Email' onChange={this.onInputChange} value={this.state.email} style={{color: '#fff', marginBottom: '30px', fontSize: '18px'}} name='email'/>
				<Input label='Пароль' type='password' onChange={this.onInputChange} value={this.state.pass} style={{color: '#fff', marginBottom: '30px', fontSize: '18px'}} name='pass'/>
				<button type='submit' className='login'>Войти</button>
			</form>
			<Link to='/signup/'>
				<button className='reg'>Регистрация</button>
			</Link>
		</div>
	}
}