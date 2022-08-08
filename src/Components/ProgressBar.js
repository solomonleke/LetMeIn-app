import React from 'react';
import zxcvbn from 'zxcvbn';


export default function ProgressBar({password}) {

const testResult = zxcvbn(password);

const num = testResult.score * 100/4;

const progressColor = ()=> {
const num = testResult.score * 100/4;
    switch(testResult.score) {
        case 0: 
            return "#828282";
        case 1: 
            return "#EA1111";
        case 2: 
            return "#FFAD00";
        case 3: 
            return "#9BC158";
        case 4: 
            return "#00B500";
        default: 
             return "none"


    } 
}

const progressBarRange = ()=>({
    width: `${num}%`,
    background: progressColor(),
    height: "7px",
    

})

const passwordLabel =()=>{
    switch(testResult.score) {
        case 0: 
            return "very weak";
        case 1: 
            return "weak";
        case 2: 
            return "fair";
        case 3: 
            return "good";
        case 4: 
            return "strong";
        default: 
             return " "


    } 
}

  return (
    <>
    <div className='progress'>
    <div className='progress-bar' style={progressBarRange()}>
    </div>
    </div>
    <h3 className='label' style={{color: progressColor()} }>{passwordLabel()}</h3>
    </>
   
  );
}
