import React, { Component } from "react";
import cssObj from "./Login.css";
import LoginNav from "./LoginNav/LoginNav"
import Logo from "@/components/Logo/Logo"
import LoginContain from "./LoginContain/LoginContain"
class Login extends Component {
    constructor() {
        super()
        this.state = {
            locale: null,
        }
    }   
    render() {
        return (
            
                <div className={cssObj.Login}>
                    <LoginNav></LoginNav>
                    <div className={cssObj.bgDiv}>
                        <Logo width='318px' height='81px'></Logo>
                        <LoginContain></LoginContain>
                    </div>
                </div>
           
        )
    }
}


export default Login
