import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	admin: adminReducer,
	user: userReducer,
});

export default rootReducer;
