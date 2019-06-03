import React from 'react';
import {Input} from '../../FormControls/Input';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import FilterSelect from '../../Filter/FilterSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import {schedule, spec, area, city, salary} from '../../../services/jobData';
import {apiCall} from '../../../services/api';
import FilterOneSelect from '../../Filter/FilterOneSelect';
import axios from 'axios';

const inputStyles = {
	boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)',
};

export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isPaid: false,
			company: '',
			area: '',
			phone: '',
			companyImg: '',
			jobName: '',
			jobDescription: '',
			email: '',
			jobSpec: '',
			jobArea: '',
			jobCity: '',
			jobSalary: '',
			jobSchedule: ''
		}
	}

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	onPopupOpen = () => {
		this.setState({
			isOpen: true
		})
	};

	componentDidMount = () => {
		this.axiosCancelSource = axios.CancelToken.source()
		const self = this;
		apiCall('post', 'https://blooming-earth-65020.herokuapp.com/get/employee', {email: self.props.currentUser.user.user.email}, { cancelToken: this.axiosCancelSource.token }).then(function (res) {
			self.setState({
				company: res.company,
				area: res.area,
				phone: res.phone,
				companyImg: res.companyImg,
				email: res.email,
			})
		}).catch(function (err) {
			console.log(err)
		})
	}

	componentWillUnmount() {
		this.axiosCancelSource.cancel('Component unmounted.');
	}

	handleClose = () => {
		this.setState({
			isOpen: false
		})
	};

	onSubmit = () => {
		const postData = {
			name: this.state.jobName,
			description: this.state.jobDescription,
			spec: this.state.jobSpec,
			area: this.state.jobArea,
			city: this.state.jobCity,
			...(this.state.jobSalary && {salary: this.state.jobSalary}),
			schedule: this.state.jobSchedule,
			company: this.state.company,
			companyImg: this.state.companyImg,
			email: this.state.email
		};
		apiCall("post", `https://blooming-earth-65020.herokuapp.com/api/postjob`, postData)

		this.setState({
			jobName: '',
			jobDescription: '',
			jobSpec: '',
			jobArea: '',
			jobCity: '',
			jobSalary: '',
			jobSchedule: ''
		})

		this.handleClose();
	};

	onSave = () => {
		const savedData = {
			email: this.props.currentUser.user.user.email,
			company: this.state.company,
			area: this.state.area,
			phone: this.state.phone,
			companyImg: this.state.companyImg,
		}

		this.props.updateUser('employee', savedData)
	}

	onRadioChange = (event) => {
		this.setState({
			isPaid: event.target.checked
		})
	};

	onSelectChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	}

	render() {
		return (<div className="account__body">
				<form className='account__form'>
					<div className="account__col">
						<div className="account__title">Информация о компании</div>
						<Input label='Наименование организации' inputStyle={inputStyles} name='company' value={this.state.company}
									 onChange={this.onInputChange}/>
						<Input label='Сфера деятельности' inputStyle={inputStyles} name='area' value={this.state.area}
									 onChange={this.onInputChange}/>
						<Input label='Контактный номер' inputStyle={inputStyles} name='phone' value={this.state.phone}
									 onChange={this.onInputChange}/>
						<Input label='Логотип компании' inputStyle={inputStyles} name='companyImg' value={this.state.companyImg}
									 onChange={this.onInputChange}/>
					</div>
					<div className="account__col">
						<div className="account__title">Вакансии</div>
						<div className='account__file' onClick={this.onPopupOpen}>
							Загрузить
						</div>
					</div>
				</form>
				<Dialog
					open={this.state.isOpen}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					fullWidth={true}
				>
					<DialogTitle id="form-dialog-title">Добавить вакансию</DialogTitle>
					<DialogContent style={{overflowY: 'unset'}}>
						<input value={this.state.jobName} onChange={this.onInputChange} type='text' name='jobName' className="filter__title"
									 placeholder='Название вакансии'/>
						<textarea contentEditable='true' value={this.state.jobDescription} onChange={this.onInputChange} name='jobDescription' className='filter__description'
											placeholder='Описание вакансии'/>
						<div className="filter__bottom-row">
							<FilterOneSelect  onSelectChange={this.onSelectChange} value={this.state.jobSpec} data={spec} name='jobSpec'
														title='Специализации'/>
							<FilterOneSelect  onSelectChange={this.onSelectChange} value={this.state.jobArea} data={area} name='jobArea'
														title='Отрасль'/>
							<FilterOneSelect  onSelectChange={this.onSelectChange} value={this.state.jobCity} data={city} name='jobCity'
														title='Населенный пункт'/>
						</div>
						<div className="filter__bottom-row">
							<FormControlLabel
								control={
									<Switch
										checked={this.state.isPaid}
										onChange={this.onRadioChange}
										value="isPaid"
										color="primary"
									/>
								}
								style={{marginLeft: '0'}}
								label="Оплачиваемая"
							/>
							{this.state.isPaid ?
								<input value={this.state.jobSalary} onChange={this.onInputChange} type='text' name='jobSalary' className="filter__salary"
											 placeholder='Размер зарплаты'/>
								: ''
							}
							<FilterOneSelect mult={false} onSelectChange={this.onSelectChange} data={schedule} value={this.state.jobSchedule}
														name='jobSchedule' title="График работы"/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Отмена
						</Button>
						<Button onClick={this.onSubmit} color="primary">
							Разместить
						</Button>
					</DialogActions>
				</Dialog>
				<div className="account__submit" onClick={this.onSave}>Сохранить</div>
			</div>
		)
	}
}