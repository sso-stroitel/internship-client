import React from 'react';
import {Input} from '../../FormControls/Input';

const inputStyles = {
	boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)',
};

export default class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.student = props.currentUser.user.user;
		this.state = {
			firstName: this.student.firstName || '',
			secondName: this.student.lastName || '',
			thirdName: this.student.thirdName || '',
			birthDate: this.student.birthDate || '',
			phone: this.student.phone || '',
			study: this.student.studyPlace || '',
			spec: this.student.spec || '',
			year: this.student.year || ''
		}
	}

	onSave = () => {
		const savedData = {
			firstName: this.state.company,
			secondName: this.state.area,
			phone: this.state.phone,
			companyImg: this.state.companyImg,
		}

		this.props.updateUser('employee', savedData)
	}

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
						<Input label='Имя' inputStyle={inputStyles} name='firstName' value={this.state.firstName} onChange={this.onInputChange}/>
						<Input label='Фамилия' inputStyle={inputStyles} name='secondName' value={this.state.secondName} onChange={this.onInputChange}/>
						<Input label='Отчество' inputStyle={inputStyles} name='thirdName' value={this.state.thirdName} onChange={this.onInputChange}/>
						<Input label='Дата рождения' inputStyle={inputStyles} style={{width: '45%', display: 'inline-block', margin: '0 37px 30px 0'}} name='birthDate' value={this.state.birthDate}
									 onChange={this.onInputChange}/>
						<Input label='Телефон' name='phone' style={{width: '45%', display: 'inline-block', marginBottom: '30px'}} inputStyle={inputStyles} value={this.state.phone} onChange={this.onInputChange}/>
						<Input label='Наименование учебного заведения' inputStyle={inputStyles} name='study' value={this.state.study}
									 onChange={this.onInputChange}/>
						<Input label='Специальность (если есть)' inputStyle={inputStyles} name='spec' value={this.state.spec}
									 onChange={this.onInputChange}/>
						<Input label='Курс/класс' name='year' inputStyle={inputStyles} value={this.state.year} onChange={this.onInputChange}/>
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