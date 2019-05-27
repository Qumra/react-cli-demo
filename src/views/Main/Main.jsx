import React, { Component } from "react";
import Header from './Header'
import Bottom from './Bottom'
import cssObj from './Main.css'
import meetCreate from '@/views/meetCreate'
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
            <Route  path={`${match.url}/:background`}  component={Topic} />
            <Route path={`${match.url}/meetCreate`}  component={meetCreate}></Route>
            </div>
            <Bottom></Bottom>
        </div>
    }
}
export default Main
