import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export function setAuthorizationToken(token) {
	setTokenHeader(token);
}

export function logout() {
	return dispatch => {
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}

export function authUser(type, userData) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall("post", `https://blooming-earth-65020.herokuapp.com/auth/${type}`, userData)
				.then(({token, ...user}) => {
					localStorage.setItem("jwtToken", token);
					setAuthorizationToken(token);
					dispatch(setCurrentUser(user));
					dispatch(removeError());
					resolve(); // indicate that the API call succeeded
				})
				.catch(err => {
					dispatch(addError(err.message));
					reject(); // indicate the API call failed
				});
		});
	};
}

export function updateUser(type, userData) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall("put", `https://blooming-earth-65020.herokuapp.com/update/${type}`, userData)
				.then(({...user}) => {
					resolve();
				})
				.catch(err => {
					dispatch(addError(err.message));
					reject(); // indicate the API call failed
				});
		})
	}
}
