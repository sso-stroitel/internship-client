import React from 'react';
import './style.scss';
import Header from '../Header';
import Footer from '../Footer';
import {spec} from '../../services/jobData';
import axios from 'axios';
import {ROOT_API} from '../../services/constants';
import {StudentCard} from './StudentCard';
import {Loader} from '../Loader';

export default class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			students: []
		}
	}

	componentDidMount = () => {
		const self = this;
		axios.get(`${ROOT_API}getStudents`).then(function (res) {
			self.setState({
				students: res.data
			})
		}).catch(function (err) {
			console.log(err)
		})
	};

	getFile = (ev, email) => {
		ev.preventDefault();
		axios.post(`${ROOT_API}getFile`, {fileName: email}).then(({data}) => {
			window.open(data.url, '_blank');
		}).catch(err => {
			console.log(err)
		})
	};

	render() {
		return (<div>
			<Header {...this.props}/>
			<div className="container students">
				<div className="student-card__wrapper">
					{this.state.students.length
						? this.state.students.map((student, i) => <StudentCard click={this.getFile} student={student} key={i}/>)
						: <Loader/>}
				</div>
			</div>
			<Footer/>
		</div>)
	}
}
