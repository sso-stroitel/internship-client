import React from 'react';
import './style.scss';
import FilterSelect from '../FormControls/Select/FilterSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import {FilterCheckbox} from '../FormControls/CheckBox/FilterCheckbox';
import { schedule as dataSchedule, spec as dataSpec, area as dataArea, city as dataCity, salary as dataSalary, postTime as postTimeData } from '../../services/jobData';
import FilterOneSelect from '../FormControls/Select/FilterOneSelect';

export default class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOpen: false,
			isPaid: false,
			text: '',
			spec: [],
			area: [],
			city: [],
			salary: [],
			created: '',
			full: false,
			part: false,
			flex: false,
			remote: false
		}
	}

	onChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	};

	onSelectChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	}

	onRadioChange = (event) => {
		this.setState({
			isPaid: event.target.checked
		})
	}

	onToggleClick = () => {
		this.setState(prevState => ({
			isToggleOpen: !prevState.isToggleOpen
		}))
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.filterAction(this.state)
	};

	onCheckChange = name => event => {
		this.setState({
			[name]: event.target.checked
		})
	}

	render() {
		const specs = Object.entries(dataSpec).slice(0, 6).reduce((acc, [key, value]) => {
			acc[key] = value
			return acc
		}, {});
		return <div className='filter'>
			<div className="filter__top">
				<div className="filter__btns">
					{Object.entries(specs).map(([key, value], idx) => (<div key={idx}>
						<input type='checkbox' className='filter__hiddenBox' value={key} id={`specs${idx}`} onChange={this.props.onHeadSpecs}/>
						<label className='filter__btn' htmlFor={`specs${idx}`}>{value}</label>
					</div>))}
				</div>
			</div>
			<div className={`filter__bottom ${this.state.isToggleOpen ? 'is-open' : ''}`}>
				<form method='GET' className="filter__bottom-container">
					<input name='text' value={this.state.text} onChange={this.onChange}  type='text' className="filter__bottom-search"
								 placeholder='Поиск по названию, ключевым словам, описанию'/>
					<div className="filter__bottom-row">
						<FilterSelect onSelectChange={this.onSelectChange} value={this.state.spec} data={dataSpec} name='spec' title='Специализации'/>
						<FilterSelect onSelectChange={this.onSelectChange} value={this.state.area} data={dataArea} name='area' title='Отрасль'/>
						<FilterSelect onSelectChange={this.onSelectChange} value={this.state.city} data={dataCity} name='city' title='Населенный пункт'/>
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
						<FilterSelect onSelectChange={this.onSelectChange} value={this.state.salary} data={dataSalary} name='salary' title='Размер зарплаты'/>
							: ''}
						<FilterOneSelect onSelectChange={this.onSelectChange} value={this.state.created} data={postTimeData} name='created' title='Время размещения'/>
					</div>
					<div className="filter__bottom-title">График работы</div>
					// TODO state
					<div className="filter__bottom-row">
						<FilterCheckbox onCheckChange={this.onCheckChange} name='full' checked={this.state.full} label='Полный день'/>
						<FilterCheckbox onCheckChange={this.onCheckChange} name='part' checked={this.state.part} label='Сменный график'/>
						<FilterCheckbox onCheckChange={this.onCheckChange} name='flex' checked={this.state.flex} label='Гибкий график'/>
						<FilterCheckbox onCheckChange={this.onCheckChange} name='remote' checked={this.state.remote} label='Удаленная работа'/>
					</div>
					<button className='filter__bottom-submit' onClick={this.onSubmit} type="submit">Поиск</button>
				</form>
			</div>
			<div className={`filter__toggle ${this.state.isToggleOpen ? 'is-open' : ''}`} onClick={this.onToggleClick}>
				<div className="filter__toggle-icon"></div>
				Фильтр
				<div className="filter__toggle-arrow"></div>
			</div>
		</div>
	}
}