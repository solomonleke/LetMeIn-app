const initialState = {
    count: "",
}

export const  verifiedReducersLan = (state = initialState, action)=>{
    switch(action.type){

        case "VERIFIED_COUNT_LAN":
            return {...state, count:  action.payload.data }
       
        default:
            return  state
    }
}