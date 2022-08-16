const initialState = {
    link: "https://api.letmein.ng",
}

export const  ApiLinkReducer = (state = initialState, action)=>{
    switch(action.type){

        case "API-LINK":
            return {link:  action.payload.data }
       
        default:
            return  state
    }
}