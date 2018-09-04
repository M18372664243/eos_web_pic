import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Home extends Component{
    // constructor(props){
    //     super(props);
    //     console.log(props.location.pathname);
    //     console.log(JSON.parse(localStorage.getItem("mspa_user")).username);
    // }
    render(){
        return(
            sessionStorage.getItem("userName")===null?
            <Redirect to="/eos_web_manage/login"/>:
            <Redirect to="/eos_web_manage/form"/>
        )
    }
}