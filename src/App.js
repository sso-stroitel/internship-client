import React from 'react';
import Main from './components/Main';
import Registration from './components/Registration'
import {Route} from 'react-router-dom';

export default class App extends React.Component {
	render = () => (<div>
		<Route path='/' exact component={Main}/>
		<Route path='/signup/' component={Registration}/>
	</div>)
}