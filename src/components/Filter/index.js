import React from 'react';
import './style.scss';
import {data} from './data';
import FilterSelect from './FilterSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import {FilterCheckbox} from './FilterCheckbox';


export default class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOpen: false,
		}
	}

	onToggleClick = () => {
		this.setState(prevState => ({
			isToggleOpen: !prevState.isToggleOpen
		}))
	};

	render() {
		return <div className='filter'>
			<div className="filter__top">
				<div className="filter__btns">
					{data.map(item => <div className='filter__btn'>{item}</div>)}
				</div>
			</div>
			<div className={`filter__bottom ${this.state.isToggleOpen ? 'is-open' : ''}`}>
				<form method='GET' className="filter__bottom-container">
					<input type='text' className="filter__bottom-search"
								 placeholder='Поиск по названию, ключевым словам, описанию'/>
					<div className="filter__bottom-row">
						<FilterSelect name='Специализации'/>
						<FilterSelect name='Отрасль'/>
						<FilterSelect name='Населенный пункт'/>
					</div>
					<div className="filter__bottom-row">
						<FormControlLabel
							control={
								<Switch
									value="checkedB"
									color="primary"
								/>
							}
							label="Оплачиваемая"
						/>
						<FilterSelect name='Населенный пункт'/>
						<FilterSelect name='Населенный пункт'/>
					</div>
					<div className="filter__bottom-title">График работы</div>
					<div className="filter__bottom-row">
						<FilterCheckbox label='Полный день'/>
						<FilterCheckbox label='Сменный график'/>
						<FilterCheckbox label='Гибкий график'/>
						<FilterCheckbox label='Удаленная работа'/>
					</div>
					<button className='filter__bottom-submit' type="submit">Поиск</button>
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