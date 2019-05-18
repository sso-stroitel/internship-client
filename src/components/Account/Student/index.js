import React from 'react';
import { Input } from '../../FormControls/Input';
import './style.scss';

export default class AccountStudent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			secondName: '',
			thirdName: '',
			email: '',
			birthDate:  '',
			phone: '',
			study: '',
			spec: '',
			year: ''
		}
	}

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	render() {
		return(<div className='account'>
				<div className="container">
					<div className="account__header">
						<div className="account__header-item">Мой профиль</div>
						<div className="account__header-item">Мои сообщения</div>
					</div>
					<div className="account__body">
						<form className='account__form'>
							<div className="account__col">
								<div className="account__title">Личная информация</div>
								<Input label='Имя' name='firstName' value={this.state.firstName} onChange={this.onInputChange} />
								<Input label='Фамилия' name='secondName' value={this.state.secondName} onChange={this.onInputChange}/>
								<Input label='Отчество' name='thirdName' value={this.state.thirdName} onChange={this.onInputChange}/>
								<Input label='Email' name='email' value={this.state.email} onChange={this.onInputChange}/>
								<Input label='Дата рождения' name='birthDate' value={this.state.birthDate} onChange={this.onInputChange}/>
								<Input label='Телефон' name='phone' value={this.state.phone} onChange={this.onInputChange}/>
								<Input label='Наименование учебного заведения' name='study' value={this.state.study} onChange={this.onInputChange}/>
								<Input label='Специальность (если есть)' name='spec' value={this.state.spec} onChange={this.onInputChange}/>
								<Input label='Курс/класс' name='year' value={this.state.year} onChange={this.onInputChange}/>
							</div>
							<div className="account__col">
								<div className="account__title">Резюме</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}