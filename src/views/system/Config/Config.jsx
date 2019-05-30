import React, { Component } from "react";
import { Row, Col} from 'antd';
import LeftNav from './LeftNav'
class Config extends Component {
    render() {
        return <div>
            <Row>
                <Col span={8}><LeftNav></LeftNav></Col>
                <Col span={16}>.col-16</Col>
            </Row>
        </div>
    }
}
export default Config
