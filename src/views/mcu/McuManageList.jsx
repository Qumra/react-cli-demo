import React, { Component } from 'react';
import { Table, Icon, Dropdown, Button, Input, Menu } from 'antd';
import cssObj from './McuManageList.css';
// import { Route } from 'react-router-dom';
const {Search} = Input;
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">修改链接</Menu.Item>
        <Menu.Item key="2">备份配置</Menu.Item>
        <Menu.Item key="3">恢复配置</Menu.Item>
        <Menu.Item key="4">诊断</Menu.Item>
        <Menu.Item key="5">删除</Menu.Item>
    </Menu>
);
function handleMenuClick(e) {
    console.log('click', e);
}
class McuManageList extends Component {
    constructor(props) {
        super(props);
        // match = props.match;
        this.columns = [{
            title: 'MCU名称',
            dataIndex: 'MCUName'
        }, {
            title: 'MCU状态',
            dataIndex: 'MCUStatus',
            render:()=>{
                return (
                    <div className={cssObj.mcuStatus}>
                        <div className={cssObj.mcuStatusBtn}>GK</div>
                        <div className={cssObj.mcuStatusBtn}>SIP</div>
                        <div className={cssObj.mcuStatusBtn}>SMC</div>
                    </div>
                );
            }
        }, {
            title: '设备型号',
            dataIndex: 'deviceModel'
        }, {
            title: 'IP地址',
            dataIndex: 'IP'
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_text, record) => {
                return (
                    this.state.dataSource.length >= 1
                        ? (
                            
                            <div className={cssObj.operationDiv}>
                                <div style={{textAlign:'right', marginRight:'20px'}}>
                                    <Icon type="edit" theme="twoTone"/>
                                    <div><Button>编辑MCU</Button> </div>
                                </div>
                                <div style={{textAlign:'right', marginRight:'20px'}}>
                                    <Icon type="delete" theme="twoTone" className={cssObj.deleteIcon}/>
                                    <div><Button>暂停预约</Button></div>
                                </div>
                                <div className={cssObj.moreDiv}>
                                    <Dropdown overlay={menu}>
                                        <div>
                                            <Icon type="ellipsis" theme="outlined" />
                                        </div> 
                                    </Dropdown>
                                </div>
                            </div>
                        ) : null
                );
            }
        }
        ];
        this.state = {
            collectionData: {},
            dataSource: [{
                key:0,
                MCUName:'江苏省部MCU',
                MCUStatus:'否',
                deviceModel:'2018/10/30  10:30',
                IP:'10.99.00.88'
            }
            ],
            count:1,
            visible:false
        };
    }
    pushAdd=()=>{
        this.props.history.push({pathname:'/main/Device/MCUManage/AddMcu'});
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return(
            <div className={cssObj.mcuManage}>
                <div className={cssObj.mcuContent}>
                    <div className={cssObj.mcuContentTitle}>
                        <span>MCU管理</span>
                        <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                    </div>
                    <div className={cssObj.mcuContentMid}>
                        <div className={cssObj.mcuContentMidpadding}>
                            <div className={cssObj.mcuContentMidHeader}>
                                <div className={cssObj.btnGroup}>
                                    <Button type="primary" className={cssObj.addBtn} onClick={this.pushAdd}>添加</Button>
                                    <Button className={cssObj.delBtn}>删除</Button>
                                    <Dropdown>
                                        <Button>更多</Button>
                                    </Dropdown>
                                </div>
                                <div >
                                    <Search
                                        placeholder="MCU名称"
                                        onSearch={value => console.log(value)}
                                        style={{ width: 240}}
                                    />
                                </div>
                            </div>
                            <Table  
                                rowSelection={rowSelection} 
                                columns={this.columns} 
                                dataSource={this.state.dataSource} 
                                pagination={false} 
                                size="small"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default McuManageList;
