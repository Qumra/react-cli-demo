import React, { Component } from "react";
import { Tabs, Checkbox, Row, Col, Tree } from 'antd';
import cssObj from './DefaultUserPermissionConfig.css'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

const plainOptions1 = ['查看系统参数', '修改系统参数', '系统日志', '系统告警', '设备配置模板', '设备软件', '查看拓扑', '设置拓扑', '查看报表', '设备巡检'];
const plainOptions2 = ['添加组织', '修改组织', '删除组织']
const plainOptions = plainOptions1.concat(plainOptions2)
const defaultCheckedList = ['Apple', 'Orange'];
class DefaultUserPermissionConfig extends Component {
    constructor() {
        super()
        this.state = {
            checkAll1: false,
            checkedList1: defaultCheckedList,
            checkAll2: false,
            checkedList2: defaultCheckedList,
        };
    }
    onCheckAllChange = (e) => {
        this.setState({
            checkAll: e.target.checked,
            checkedList: e.target.checked ? plainOptions : [],
        });
    }
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            checkAll1: checkedList.length === plainOptions.length,
        });
    }
    onCheckAllChange1 = (e) => {
        this.setState({
            checkAll1: e.target.checked,
            checkedList1: e.target.checked ? plainOptions1 : [],
        });
    }
    onChange1 = (checkedList1) => {
        this.setState({
            checkedList1,
            // indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll1: checkedList1.length === plainOptions1.length,
        });
    }
    onCheckAllChange2 = (e) => {
        this.setState({
            checkAll2: e.target.checked,
            checkedList2: e.target.checked ? plainOptions2 : [],
        });
    }
    onChange2 = (checkedList2) => {
        this.setState({
            checkedList2,
            checkAll1: checkedList2.length === plainOptions2.length,
        });
    }
    render() {
        return <div className={cssObj.panelDiv}>
            <Tabs type="card">
                <TabPane tab="外部用户" key="1">
                    <Checkbox
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        全选
                            </Checkbox>
                    <fieldset>
                        <legend>
                            <Checkbox
                                onChange={this.onCheckAllChange1}
                                checked={this.state.checkAll1}
                            >
                                系统管理
                            </Checkbox>
                        </legend>
                        <div className={cssObj.checkAll}>
                            <Checkbox.Group onChange={this.onChange1} value={this.state.checkedList1}>
                                <Row>{
                                    plainOptions1.map((el, index) => {
                                        return (
                                            <Col span={6}>
                                                <Checkbox value={el} key={index} >{el}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                                </Row>
                            </Checkbox.Group>

                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <Checkbox
                                // indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange2}
                                checked={this.state.checkAll2}
                            >
                                组织结构管理
                            </Checkbox>
                        </legend>
                        <div className={cssObj.checkAll}>
                            <Checkbox.Group onChange={this.onChange2} value={this.state.checkedList2}>
                                <Row>{
                                    plainOptions2.map((el, index) => {
                                        return (
                                            <Col span={6}>
                                                <Checkbox value={el} key={index} >{el}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                                </Row>
                            </Checkbox.Group>

                        </div>
                    </fieldset>
                    <div className={cssObj.EditExtUserOrgRelation}>
                        <div className={cssObj.dxtlControl}>
                            <div className={cssObj.controlHead}>
                                可访问的组织
                            </div>
                            <Tree
                                showLine
                                defaultExpandedKeys={['0-0-0']}
                                onSelect={this.onSelect}
                            >
                                <TreeNode title="root" key="0-0">
                                    <TreeNode title="路盼" key="0-0-0">
                                        <TreeNode title="llhy" key="0-0-0-0" />
                                    </TreeNode>
                                </TreeNode>
                            </Tree>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    }
}
export default DefaultUserPermissionConfig
