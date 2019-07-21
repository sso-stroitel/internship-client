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
			students: [],
			isChatOpen: false,
			response: '',
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

	onResponseChange = ({target}) => {
		this.setState({
			response: target.value
		})
	};

	onSubmit =  (e) => {
		this.axiosCancelSource = axios.CancelToken.source();
		const self = this;
		e.preventDefault();
		axios.post(`${ROOT_API}message/post`, {
			email: self.props.currentUser.user.email,
			message: this.state.response,
			recEmail: this.state.isChatOpen.email,
			firstName: this.state.isChatOpen.firstName,
			lastName: this.state.isChatOpen.lastName,
			company: self.props.currentUser.user.company
		}, {cancelToken: this.axiosCancelSource.token});
		self.setState({
			response: '',
			isChatOpen: false
		})
	};

	onChat = (e, student) => {
		this.setState(prevState => ({
			isChatOpen: prevState.isChatOpen.email === student.email ? false : student
		}))
	};

	render() {
		return (<div>
			<Header {...this.props}/>
			<div className="container students">
				<div className="student-card__wrapper">
					{this.state.students.length
						? this.state.students.map((student, i) => <StudentCard chat={this.onChat} click={this.getFile}
																																	 student={student} key={i}/>)
						: <Loader/>}
				</div>
				{this.state.isChatOpen ?
					<form onSubmit={this.onSubmit} className="student-card__chat">
						<div className="student-card__recipient">{this.state.isChatOpen.firstName} {this.state.isChatOpen.lastName}</div>
						<textarea placeholder='Здравствуйте, заинтересовало ваше резюме, расскажите пожалуйста подробнее про себя...' value={this.state.response} onChange={this.onResponseChange} name="response" cols="30" rows="10"
											className='student-card__text'/>
						<button type='submit' className='student-card__submit'>Отправить</button>
					</form> : ''}
			</div>
			<Footer/>
		</div>)
	}
}
