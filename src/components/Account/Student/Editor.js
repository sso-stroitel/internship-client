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
			year: '',
			photo: '',
			isCV: false
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
				isCV: res.CV,
				photo: res.photo,
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
		const { firstName, secondName, thirdName, birthDate, phone, study, spec, year, photo } = this.state;
		const savedData = {
			email: this.props.currentUser.user.email,
			firstName,
			lastName: secondName,
			thirdName,
			birthDate,
			phone,
			studyPlace: study,
			spec,
			photo,
			year
		};

		this.props.updateUser('student', savedData)
	};

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	onFileChange =({target}) => {
		let fileFormData = new FormData();
		const file = new File([target.files[0]], this.props.currentUser.user.email, {type: target.files[0].type});
		fileFormData.append('file', file);
		axios.post(`${ROOT_API}file`, fileFormData).then(() => {
			this.props.updateUser('student', {CV: true, email: this.props.currentUser.user.email});
			this.setState({
				isCV: true
			})
		}).catch(err=> {
			console.log(err)
		})
	};

	getFile = (ev) => {
		ev.preventDefault();
		axios.post(`${ROOT_API}getFile`, {fileName: this.props.currentUser.user.email}).then(({data})=> {
			window.open(data.url, '_blank');
		}).catch(err=> {
			console.log(err)
		})
	};

	render() {
		const CV = <div className='account__success-upload'>
			Резюме загружено
			<button onClick={this.getFile} />
		</div>;
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
						<Input disabled={this.state.isDisabledInput} label='Фото' name='photo' inputStyle={inputStyles} value={this.state.photo} onChange={this.onInputChange}/>
					</div>
					<div className="account__col">
						<div className="account__title">Резюме</div>
						{this.state.isCV
							? CV
							: ''}
						<label className='account__file'>
							{this.state.isCV ? 'Обновить' : 'Загрузить'}
							<input onChange={this.onFileChange} type="file" name='cv'/>
						</label>
					</div>
				</form>
				<div onClick={this.onSave} className="account__submit">Сохранить</div>
			</div>
		)
	}
}