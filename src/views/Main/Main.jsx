import React, { Component } from "react";
import Header from './Header'
import Bottom from './Bottom'
import cssObj from './Main.css'
class Main extends Component {
    render(){
        return <div className={cssObj.Main}>
        <Header></Header>
            <Bottom></Bottom>
        </div>
    }
}
export default Main
