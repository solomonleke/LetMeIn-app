import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MiddleWare() {
    const isLogged = useSelector((state) => state.isLogged);
    const nav = useNavigate()

    const middleWare = ()=>{
        if(isLogged.isLogged !== true){
            nav("/sign-in")
        }
    }
    useEffect(() => {
        middleWare()
    }, []);
}
