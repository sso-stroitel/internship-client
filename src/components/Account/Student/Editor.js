import React from 'react';
import {Input} from '../../FormControls/Input';
import axios from 'axios';
import {apiCall} from '../../../services/api';
import {ROOT_API} from '../../../services/constants';

const inputStyles = {
	boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)',
};

export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDisabledInput: true,
			firstName: '',
			secondName: '',
			thirdName: '',
			birthDate: '',
			phone: '',
			study: '',
			spec: '',
			year: ''
		}
	}

	componentDidMount = () => {
		this.axiosCancelSource = axios.CancelToken.source();
		const self = this;
		apiCall('post', `${ROOT_API}get/student`, {email: self.props.currentUser.user.email}, { cancelToken: this.axiosCancelSource.token }).then(function (res) {
			self.setState({
				firstName: res.firstName,
				secondName: res.lastName,
				thirdName: res.thirdName,
				birthDate: res.birthDate,
				phone: res.phone,
				study: res.studyPlace,
				spec: res.spec,
				year: res.year,
				isDisabledInput: false
			})
		}).catch(function (err) {
			console.log(err)
		})
	};

	componentWillUnmount() {
		this.axiosCancelSource.cancel('Component unmounted.');
	}

	onSave = () => {
		const savedData = {
			firstName: this.state.company,
			secondName: this.state.area,
			phone: this.state.phone,
			companyImg: this.state.companyImg,
		};

		this.props.updateUser('employee', savedData)
	};

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	onFileChange =({target}) => {
		console.log(target.files)
	}

	render() {
		return (<div className="account__body">
				<form className='account__form'>
					<div className="account__col">
						<div className="account__title">Личная информация</div>
						<Input disabled={this.state.isDisabledInput} label='Имя' inputStyle={inputStyles} name='firstName' value={this.state.firstName} onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Фамилия' inputStyle={inputStyles} name='secondName' value={this.state.secondName} onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Отчество' inputStyle={inputStyles} name='thirdName' value={this.state.thirdName} onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Дата рождения' inputStyle={inputStyles} style={{width: '45%', display: 'inline-block', margin: '0 37px 30px 0'}} name='birthDate' value={this.state.birthDate}
									 onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Телефон' name='phone' style={{width: '45%', display: 'inline-block', marginBottom: '30px'}} inputStyle={inputStyles} value={this.state.phone} onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Наименование учебного заведения' inputStyle={inputStyles} name='study' value={this.state.study}
									 onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Специальность (если есть)' inputStyle={inputStyles} name='spec' value={this.state.spec}
									 onChange={this.onInputChange}/>
						<Input disabled={this.state.isDisabledInput} label='Курс/класс' name='year' inputStyle={inputStyles} value={this.state.year} onChange={this.onInputChange}/>
					</div>
					<div className="account__col">
						<div className="account__title">Резюме</div>
						<label className='account__file'>
							Загрузить
							<input onChange={this.onFileChange} type="file" name='cv'/>
						</label>
					</div>
				</form>
				<div onClick={this.onSave} className="account__submit">Сохранить</div>
			</div>
		)
	}
}