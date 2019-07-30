import React, { Component } from 'react';
import { Button, Table, Dropdown, Menu, Popconfirm, Icon} from 'antd';
import styleObj from './EUADetail.css';

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">AD与企业通讯录全量同步</Menu.Item>
        <Menu.Item key="2">导入AD数据模型</Menu.Item>
        <Menu.Item key="3">导入AD根证书</Menu.Item>
    </Menu>
);
function handleMenuClick(e) {
    console.log('click', e);
}
class ADConfig extends Component {
    constructor() {
        super();
        this.columns = [{
            title: 'AD名称',
            dataIndex: 'ADName'
        }, {
            title: '启用AD认证',
            dataIndex: 'enableAD'
        }, {
            title: '服务器类型',
            dataIndex: 'serverType'
        }, {
            title: 'AD服务器地址',
            dataIndex: 'ADIP'
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_text, record) => {
                return (
                    this.state.dataSource.length >= 1
                        ? (
                            
                            <div className={styleObj.operationDiv}>
                                <div className={styleObj.editDiv}>
                                    <Icon type="edit" theme="twoTone" />
                                    <div>编辑</div>
                                </div>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                    <div className={styleObj.delDiv}>
                                        <Icon type="delete" theme="twoTone" className={styleObj.deleteIcon}/>
                                        <div>删除</div>
                                    </div>
                                </Popconfirm>
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
                ADName:'南区AD',
                enableAD:'否',
                serverType:890,
                ADIP:'10.99.00.88'
            },
            {
                key:1,
                ADName:'南区AD',
                enableAD:'否',
                serverType:890,
                ADIP:'10.99.00.88'
            }
            ],
            count:2,
            visible:false
        };
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return(
            <div className={styleObj.ADConfig}>
                <div className={styleObj.btnGroup}>
                    <Button type="primary" className={styleObj.addBtn}>添加</Button>
                    <Button className={styleObj.delBtn}>删除</Button>
                    <Dropdown overlay={menu}>
                        <Button>更多</Button>
                    </Dropdown>
                </div>
                <Table  rowSelection={rowSelection} 
                    columns={this.columns} 
                    dataSource={this.state.dataSource} 
                    size="small" 
                    Pagination={{defaultCurrent:1, 
                        total:this.state.count, 
                        showSizeChanger:true, 
                        showTotal :(total) => `Total ${total} items`,
                        showQuickJumper:true}}
                />
            </div>
        );
    }
}
export default ADConfig;
