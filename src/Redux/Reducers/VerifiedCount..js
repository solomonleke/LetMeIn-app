const initialState = {
    count: "",
}

export const  verifiedReducers = (state = initialState, action)=>{
    switch(action.type){

        case "VERIFIED_COUNT":
            return {...state, count:  action.payload.data }
       
        default:
            return  state
    }
}