import React, { Component } from "react";
import { Tabs, Checkbox, Row, Col, Tree, Divider } from 'antd';
import cssObj from './DefaultUserPermissionConfig.css'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

const plainOptionsSystem = ['查看系统参数', '修改系统参数', '系统日志', '系统告警', '设备配置模板', '设备软件', '查看拓扑', '设置拓扑', '查看报表', '设备巡检'];
const plainOptionsNode = ['添加组织', '修改组织', '删除组织']
const defaultCheckedList = ['Apple', 'Orange'];
class DefaultUserPermissionConfig extends Component {
    constructor() {
        super()
        this.state = {
            checkAllSystem: false,
            checkedListSystem: defaultCheckedList,
            checkAllNode: false,
            checkedListNode: defaultCheckedList,
        };
    }
    // 全选
    onCheckAllChange = (e) => {
        this.setState({
            checkedListSystem: e.target.checked ? plainOptionsSystem : [],
            checkedListNode: e.target.checked ? plainOptionsNode : [],
            indeterminateSystem: false,
            indeterminateNode: false,
            checkAllSystem: e.target.checked,
            checkAllNode: e.target.checked,
        });
    }
    // 系统管理
    onCheckAllChangeSystem = (e) => {
        this.setState({
            checkAllSystem: e.target.checked,
            indeterminateSystem: false,
            checkedListSystem: e.target.checked ? plainOptionsSystem : [],
        });
    }
    onChangeSystem = (checkedListSystem) => {
        this.setState({
            checkedListSystem,
            indeterminateSystem: !!checkedListSystem.length && (checkedListSystem.length < plainOptionsSystem.length),
            checkAllSystem: checkedListSystem.length === plainOptionsSystem.length,
        });
    }
    // 组织结构管理
    onCheckAllChangeNode = (e) => {
        this.setState({
            checkAllNode: e.target.checked,
            indeterminateNode: false,
            checkedListNode: e.target.checked ? plainOptionsNode : [],
        });
    }
    onChangeNode = (checkedListNode) => {
        this.setState({
            checkedListNode,
            indeterminateNode: !!checkedListNode.length && (checkedListNode.length < plainOptionsNode.length),
            checkAllNode: checkedListNode.length === plainOptionsNode.length,
        });
    }
    render() {
        return <div className={cssObj.panelDiv}>
            <Tabs type="card">
                <TabPane tab="外部用户" key="System">
                    <Divider orientation="left">
                        <Checkbox
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAllSystem && this.state.checkAllSystem}
                            indeterminate={this.state.indeterminateSystem || this.state.indeterminateNode || (this.state.checkAllSystem || this.state.checkAllNode) && !(this.state.checkAllSystem && this.state.checkAllNode)}
                        >
                            全选
                            </Checkbox>
                    </Divider>
                    <Divider orientation="left">
                        <Checkbox
                            onChange={this.onCheckAllChangeSystem}
                            checked={this.state.checkAllSystem}
                            indeterminate={this.state.indeterminateSystem}
                        >
                            系统管理
                            </Checkbox>
                    </Divider >
                    <div className={cssObj.checkAll}>
                        <Checkbox.Group onChange={this.onChangeSystem} value={this.state.checkedListSystem}>
                            <Row>{
                                plainOptionsSystem.map((el, index) => {
                                    return (
                                        <Col span={6} key={index}>
                                            <Checkbox value={el}>{el}</Checkbox>
                                        </Col>
                                    )
                                })
                            }
                            </Row>
                        </Checkbox.Group>

                    </div>
                    <Divider orientation="left">
                        <Checkbox
                            indeterminate={this.state.indeterminateNode}
                            onChange={this.onCheckAllChangeNode}
                            checked={this.state.checkAllNode}
                        >
                            组织结构管理
                            </Checkbox>
                    </Divider>
                    <div className={cssObj.checkAll}>
                        <Checkbox.Group onChange={this.onChangeNode} value={this.state.checkedListNode}>
                            <Row>{
                                plainOptionsNode.map((el, index) => {
                                    return (
                                        <Col span={6} key={index}>
                                            <Checkbox value={el}  >{el}</Checkbox>
                                        </Col>
                                    )
                                })
                            }
                            </Row>
                        </Checkbox.Group>

                    </div>
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
