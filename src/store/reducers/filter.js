import { SET_FILTER_DATA} from "../actionTypes";

export default (state = {}, action) => {
	switch (action.type) {
		case SET_FILTER_DATA:
			return {
				filter: action
			};
		default:
			return state;
	}
};