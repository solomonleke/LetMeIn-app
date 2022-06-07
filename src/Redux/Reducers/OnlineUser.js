const initialState = {
    user: {},
    loading: false
}

export const  userReducers = (state = initialState, action)=>{
    switch(action.type){
        case "ADD_USER":
            return {...state, user:  action.payload.data }
       
        default:
            return  state
    }
}