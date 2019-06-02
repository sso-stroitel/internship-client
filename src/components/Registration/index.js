import React from 'react';
import './style.scss';
import {Input} from '../FormControls/Input';

class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isStudent: true,
			email: '',
			pass: '',
			repeatPass: '',
			firstName: '',
			lastName: '',
			study: '',
			company: '',
			area: '',
			spec: ''
		}
	}

	onToggleChange = () => {
		this.setState(prevState => ({
			isStudent: !prevState.isStudent,
			email: '',
			pass: '',
			repeatPass: '',
			firstName: '',
			lastName: '',
			study: '',
			company: '',
			area: '',
			spec: ''
		}))

	};

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	onSubmit = (ev) => {
		ev.preventDefault();
		if (this.isValid() === 'VALID') {
			const data = {
				isStudent: this.state.isStudent,
				email: this.state.email,
				password: this.state.pass,
				...(this.state.firstName && {firstName: this.state.firstName }),
				...(this.state.lastName && {lastName: this.state.lastName}),
				...(this.state.studyPlace && {studyPlace: this.state.study}),
				...(this.state.spec && {spec: this.state.spec}),
				...(this.state.company && {company: this.state.company}),
				...(this.state.area && {area: this.state.area})
			};
			const authType = this.props.signUp ? "signup" : "signin";
			this.props
				.onAuth(authType, data)
				.then(() => {
					this.props.history.push("/");
				})
				.catch(() => {
					return;
				});
		}
	};

	isValid = () => {
		const {email, pass, repeatPass} = this.state;
		if (pass !== repeatPass && !pass && !email) {
			return false
		}
		if (this.state.isStudent) {
			return this.studentValid() ? 'VALID' : 'INVALID';
		} else {
			return this.companyValid() ? 'VALID' : 'INVALID';
		}
	};

	studentValid = () => {
		const {firstName, lastName, study} = this.state;
		return !!(firstName && lastName && study);
	};

	companyValid = () => {
		const { area, company } = this.state;
		return !!(area && company);
	};

	render() {
		let extraThirdField, extraFourthField;
		const extraFirstField = this.state.isStudent
			? <Input label='Учебное заведение' onChange={this.onInputChange} value={this.state.study} name='study'/>
			:
			<Input label='Наименование организации' name='company' onChange={this.onInputChange} value={this.state.company}/>;
		const extraSecondField = this.state.isStudent
			? <Input label='Специальность (если есть)' name='spec' onChange={this.onInputChange} value={this.state.spec}/>
			: <Input label='Сфера деятельности' name='area' onChange={this.onInputChange} value={this.state.area}/>;
		if (this.state.isStudent) {
			extraThirdField =
				<Input label='Имя' name='firstName' onChange={this.onInputChange} value={this.state.firstName}/>;
			extraFourthField =
				<Input label='Фамилия' name='lastName' onChange={this.onInputChange} value={this.state.lastName}/>;
		}
		return <div className='registration'>
			<form onSubmit={this.onSubmit} className="registration__form">
				<div className="registration__choices">
					<div>
						<input type="radio" name='role' id='reg-student' value='student' onChange={this.onToggleChange}
									 checked={this.state.isStudent}/>
						<label className="registration__student" htmlFor="reg-student">Я студент/школьник</label>
					</div>
					<div>
						<input type="radio" name='role' id='reg-employee' value='employee' onChange={this.onToggleChange}
									 checked={!this.state.isStudent}/>
						<label htmlFor="reg-employee" className="registration__employee">Я работодатель</label>
					</div>
				</div>
				<Input label='Email' name='email' onChange={this.onInputChange} value={this.state.email}/>
				<Input label='Пароль' name='pass' type='password' onChange={this.onInputChange} value={this.state.pass}/>
				<Input label='Повторите пароль' type='password' name='repeatPass' onChange={this.onInputChange}
							 value={this.state.repeatPass}/>
				{extraFirstField}
				{extraSecondField}
				{extraThirdField}
				{extraFourthField}
				<button type='submit' className='registration__submit'>Зарегистрироваться</button>
			</form>
		</div>
	}
}

export default Registration;