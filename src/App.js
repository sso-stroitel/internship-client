import React from 'react';
import Main from './components/Main';
import Registration from './components/Registration'
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {authUser, updateUser} from "./store/actions/auth";
import {removeError} from "./store/actions/errors";
import AccountStudent from './components/Account/Student';
import AccountCompany from './components/Account/Company';
import { ArticleList } from './components/Articles/ArticlesList';


const App = props => {
	const {authUser, errors, removeError, currentUser, updateUser} = props;
	return (<div>
		<Route path='/' exact render={props => {
			return (<Main onAuth={authUser} removeError={removeError} currentUser={currentUser} errors={errors} {...props}/>)
		}
		}/>
		<Route path='/signup/' render={props => {
			return (<Registration onAuth={authUser} removeError={removeError} signUp errors={errors} {...props}/>)
		}
		}/>
		<Route path='/student' render={props => {
			return (<AccountStudent currentUser={currentUser} {...props}/>)
		}
		}/>
		<Route path='/company' render={props => {
			return (<AccountCompany currentUser={currentUser} updateUser={updateUser} {...props}/>)
		}
		}/>
		<Route path='/articles' render={props => {
			return (<ArticleList currentUser={currentUser} errors={errors} {...props}/>)
		}} />
	</div>)
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}


export default withRouter(
	connect(mapStateToProps, {authUser, removeError, updateUser})(App)
);