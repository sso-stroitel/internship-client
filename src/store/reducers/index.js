import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import filter from "./filter"

const rootReducer = combineReducers({
	currentUser,
	errors,
	filter
});

export default rootReducer;
