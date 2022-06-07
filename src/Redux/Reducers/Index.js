import { combineReducers } from "redux";
import counterReducer from "./Counter";
import loggedReducer from "./IsLoggedIn";
import { userReducers } from "./OnlineUser";
import { todoReducers } from "./Todo";



const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    myTodo: todoReducers,
    onlineUser: userReducers
})

export default allReducers;

