import React, { Component } from "react";
import { Row, Col} from 'antd';
import LeftNav from './LeftNav'
import { Route} from 'react-router-dom';
import Conference from './Conference/Conference'
const match='';
class Config extends Component {
    constructor(props){
        super(props)
        const {match}  = props.match;
    }
    render() {
        return <div>
            <Row>
                <Col span={4}><LeftNav></LeftNav></Col>
                <Col span={20}>.col-16
                <Route  path={`${match.url}/Conference`} component={Conference}></Route>
                </Col>
            </Row>
        </div>
    }
}
export default Config
