import { SET_FILTER_DATA } from '../actionTypes';

export function setFilter(data) {
	return {
		type: SET_FILTER_DATA,
		data
	}
}

export const dispatchFilter = (data) => {
	return dispatch => dispatch(setFilter(data))
};