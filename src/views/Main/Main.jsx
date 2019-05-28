import React, { Component } from "react";
import Header from './Header'
import Bottom from './Bottom'
import cssObj from './Main.css'
import meetCreate from '@/views/meetCreate/meetCreate'
import Config from '@/views/system/Config/Config'
import defaultIndex from './defaultIndex'
const Topic = ({ match }) => {
    return <div style={{width:"300px",height:"300px",textAlign:"center",lineHeight:"300px",background:'#'+match.params.background}}><h3 style={{color:"#fff"}}>莫兰迪色系</h3></div>
};
let match = ""
class Main extends Component {
    constructor(props) {
        super()
        this.state = {
        }
        match = props.match;
    }
    render(){
        return <div className={cssObj.Main}>
        <Header></Header>
             <div className={cssObj.content}>
            <Route  path={`${match.url}/default`} component={defaultIndex}></Route>
            <Route  path={`${match.url}/meeting/blue`}  component={Topic} />
            <Route  path={`${match.url}/meeting/meetCreate`}  component={Meeting.meetCreate}></Route>
                 <Route  path={`${match.url}/system/Config`}  component={Config}></Route>
            </div>
            <Bottom></Bottom>
        </div>
    }
}
export default Main
