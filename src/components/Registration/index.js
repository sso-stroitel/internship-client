import React from 'react';
import './style.scss';
import {Input} from '../FormControls/Input';
import {validationText} from '../../services/validation'
import {RegHeader} from './RegHeader';


class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isStudent: true,
			email: '',
			pass: '',
			firstName: '',
			lastName: '',
			study: '',
			company: '',
			area: '',
			isErrorShow: false,
			validEmail: '',
			validPass: '',
			validFirstName: '',
			validLastName: '',
			validStudy: '',
			validCompany: '',
			validArea: '',
			validSpec: '',
		}
	}

	onToggleChange = () => {
		this.setState(prevState => ({
			isStudent: !prevState.isStudent,
			email: '',
			pass: '',
			firstName: '',
			lastName: '',
			study: '',
			company: '',
			area: '',
			spec: '',
			isErrorShow: false,
			validEmail: '',
			validPass: '',
			validFirstName: '',
			validLastName: '',
			validStudy: '',
			validCompany: '',
			validArea: '',
			validSpec: '',
		}))

	};

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		}, ()=>{
			if (this.state.isErrorShow) {
				this.validText();
			}
		});
	};

	validText = () => {
		const {email, pass, firstName, lastName, study, spec, company, area} = this.state;
		this.setState({
			validPass: pass.length < 6 ? validationText.wrongPassword : '',
			validEmail: !/\S+@\S+\.\S+/.test(email) ? validationText.wrongEmail : '',
			validFirstName: this.state.isStudent && firstName.length < 1 ? validationText.requiredField : '',
			validLastName: this.state.isStudent && lastName.length < 1 ? validationText.requiredField : '',
			validStudy: this.state.isStudent && study.length < 1 ? validationText.requiredField : '',
			validSpec: !this.state.isStudent && spec.length < 1 ? validationText.requiredField : '',
			validCompany: !this.state.isStudent && company.length < 1 ? validationText.requiredField : '',
			validArea: !this.state.isStudent && area.length < 1  ? validationText.requiredField : '',
		})
	};

	onSubmit = (ev) => {
		ev.preventDefault();
		if (this.isValid() === 'VALID') {
			const data = {
				isStudent: this.state.isStudent,
				email: this.state.email,
				password: this.state.pass,
				...(this.state.firstName && {firstName: this.state.firstName}),
				...(this.state.lastName && {lastName: this.state.lastName}),
				...(this.state.study && {studyPlace: this.state.study}),
				...(this.state.spec && {spec: this.state.spec}),
				...(this.state.company && {company: this.state.company}),
				...(this.state.area && {area: this.state.area})
			};
			const authType = this.props.signUp ? "signup" : "signin";
			this.props
				.onAuth(authType, data)
				.then(() => {
					this.props.history.push("/");
					window.location.reload();
				})
				.catch(() => {
					return;
				});
		}
	};

	isValid = () => {
		this.setState({
			isErrorShow: true
		});
		this.validText();
		const {email, pass} = this.state;
		if (!/\S+@\S+\.\S+/.test(email) || pass.length < 6 ) {
			return 'INVALID'
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
		const {area, company} = this.state;
		return !!(area && company);
	};

	render() {
		let extraThirdField, extraFourthField;
		const extraFirstField = this.state.isStudent
			? <Input validText={this.state.validStudy} label='Учебное заведение' onChange={this.onInputChange}
							 value={this.state.study} name='study'/>
			:
			<Input validText={this.state.validCompany} label='Наименование организации' name='company'
						 onChange={this.onInputChange} value={this.state.company}/>;
		const extraSecondField = this.state.isStudent
			? <Input validText={this.state.validFirstName} label='Имя' name='firstName' onChange={this.onInputChange}
							 value={this.state.firstName}/>
			:
			<Input validText={this.state.validArea} label='Сфера деятельности' name='area' onChange={this.onInputChange}
						 value={this.state.area}/>;
		if (this.state.isStudent) {
			extraThirdField =
				<Input validText={this.state.validLastName} label='Фамилия' name='lastName' onChange={this.onInputChange}
							 value={this.state.lastName}/>;
			extraFourthField =
				<Input label='Специальность (если есть)' name='spec'
							 onChange={this.onInputChange} value={this.state.spec}/>
		}
		return <div className='registration'>
			<RegHeader />
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
				<Input validText={this.state.validEmail} label='Email' name='email' onChange={this.onInputChange}
							 value={this.state.email}/>
				<Input validText={this.state.validPass} label='Пароль' name='pass' type='password'
							 onChange={this.onInputChange} value={this.state.pass}/>
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
