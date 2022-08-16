import { combineReducers } from "redux";
import { ApiLinkReducer } from "./ApiLink";
import counterReducer from "./Counter";
import loggedReducer from "./IsLoggedIn";
import { userReducers } from "./OnlineUser";
import { todoReducers } from "./Todo";
import { verifiedReducers } from "./VerifiedCount.";
import { verifiedReducersLan } from "./VerifiedLan";



const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    myTodo: todoReducers,
    onlineUser: userReducers,
    verifiedCount: verifiedReducers,
    verifiedCountLan: verifiedReducersLan,
    apiLink: ApiLinkReducer,
})

export default allReducers;

