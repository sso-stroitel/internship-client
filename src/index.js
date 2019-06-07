import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import App from './App';
import 'index.scss'
import {configureStore} from './store';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	// prevent someone from manually tampering with the key of jwtToken in localStorage
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
	} catch (e) {
		store.dispatch(setCurrentUser({}));
	}
}

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App/>
		</HashRouter>
	</Provider>,
	document.getElementById("root")
);