import { combineReducers } from "redux";
import counterReducer from "./Counter";
import loggedReducer from "./IsLoggedIn";
import { userReducers } from "./OnlineUser";
import { todoReducers } from "./Todo";
import { verifiedReducers } from "./VerifiedCount.";



const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    myTodo: todoReducers,
    onlineUser: userReducers,
    verifiedCount: verifiedReducers
})

export default allReducers;

