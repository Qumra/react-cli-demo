import React, { Component } from "react";
import { Tabs, Checkbox, Row, Col } from 'antd';
import cssObj from './DefaultUserPermissionConfig.css'
const TabPane = Tabs.TabPane;
class DefaultUserPermissionConfig extends Component {
    constructor() {
        super()
        this.state = {
            indeterminate: true,
            checkAll: false,
        };
    }
    onCheckAllChange = (e) => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    onChange=(checkedValues) =>{
        console.log('checked = ', checkedValues);
      }
    render() {
        return <div className={cssObj.panelDiv}>
            <Tabs type="card">
                <TabPane tab="外部用户" key="1">
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        全选
                    </Checkbox>
                    <div className={cssObj.checkAll}>
                    <Row>
                        <Checkbox.Group onChange={this.onChange}>
                            
                                <Col span={6}><Checkbox value="A">A</Checkbox></Col>
                                <Col span={6}><Checkbox value="B">B</Checkbox></Col>
                                <Col span={6}><Checkbox value="C">C</Checkbox></Col>
                                <Col span={6}><Checkbox value="D">D</Checkbox></Col>
                                <Col span={6}><Checkbox value="E">E</Checkbox></Col>
                           
                        </Checkbox.Group>
                        </Row>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    }
}
export default DefaultUserPermissionConfig
