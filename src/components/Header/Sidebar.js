import React from 'react';
import {Input} from '../FormControls/Input'
import fetch from 'isomorphic-fetch';
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
		fetch('http://localhost:3000/auth/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.pass,
			})
		}).then(res => res.json())
			.then(json => console.log(json))
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