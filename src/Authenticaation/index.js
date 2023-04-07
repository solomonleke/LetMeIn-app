export const isActive = (path, location)=>{
 let result = path === location ? true : false;

 return result
}
export const isAuthenticated = (isLogged,onlineUser)=>{

 let result = isLogged.isLogged === true && onlineUser !== null ? true : false;

 return result
}
export const isSecurity = (type)=>{
 let result = type === "Security operative" ? true : false;

 return result
}
export const isResident = (type)=>{
 let result = type === "Resident" ? true : false;

 return result
}
export const isVerified = (type)=>{
 let result = type === "Resident" || type === "Estate manager" ? true : false;

 return result
}

export const isEstateAdmin = (type)=>{
 let result = type === "Estate manager" ? true : false;

 return result
}
export const isSuperAdmin = (type)=>{
 let result = type === "Super admin" ? true : false;

 return result
}