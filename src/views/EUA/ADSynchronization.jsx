import React, { Component } from 'react';
import { Button, Table, Dropdown, Menu, Popconfirm, Icon, Tooltip} from 'antd';
import styleObj from './EUADetail.css';
import AddADSynchronizationModal from './AddADSynchronizationModal';
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
class ADSynchronization extends Component {
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
                                <Tooltip placement="bottom" title="编辑" className={styleObj.editDiv}>
                                    <Icon type="edit" theme="twoTone"/>
                                </Tooltip>
                               
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                    <Tooltip placement="bottom" title="删除" className={styleObj.delDiv}>
                                        <Icon type="delete" theme="twoTone" className={styleObj.deleteIcon}/>
                                    </Tooltip>
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
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    // 取消或关闭弹窗
    handleCancel = () => {
        this.setState({ visible: false });
    }
    // 弹窗显示
    showModal = () => {
        this.setState({ collectionData: { ADName: '', enableAD:'', serverType: '', ADIP:'', key: this.state.count }, visible: true });
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
                    <Button type="primary" className={styleObj.addBtn} onClick={this.showModal}>添加</Button>
                    <Button className={styleObj.delBtn}>删除</Button>
                    <Dropdown overlay={menu}>
                        <Button>更多</Button>
                    </Dropdown>
                </div>
                
                <Table  rowSelection={rowSelection} 
                    columns={this.columns} 
                    dataSource={this.state.dataSource} 
                    size="small" 
                    expandedRowRender={record => <table className={styleObj.detailTable} cellSpacing="20"> 
                        <tbody>
                            <div className={styleObj.tr}>
                                <tr>
                                    <td className={styleObj.title}>AD名称</td>
                                    <td className={styleObj.content}>UDP</td>
                                    <td className={styleObj.title}>AD过滤条件</td>
                                    <td className={styleObj.content}>obiectClass=commonobiect</td>
                                </tr>
                            </div>
                            <div className={styleObj.tr}>
                                <tr>
                                    <td className={styleObj.title}>启用AD认证</td>
                                    <td className={styleObj.content}>否</td>
                                    <td className={styleObj.title}>启用加密</td>
                                    <td className={styleObj.content}>否</td>
                                </tr>
                            </div>
                            <div className={styleObj.tr}>
                                <tr>
                                    <td className={styleObj.title}>AD服务器地址</td>
                                    <td className={styleObj.content}>200.09.89.00, 200.99.99.99</td>
                                    <td className={styleObj.title}>开启自动同步</td>
                                    <td className={styleObj.content}>是</td>
                                </tr>
                            </div>
                            <div className={styleObj.tr}>
                                <tr >
                                    <td className={styleObj.title}>AD服务器端口</td>
                                    <td className={styleObj.content}>拒绝新注册</td>
                                    <td className={styleObj.title}>下次自动同步时间</td>
                                    <td className={styleObj.content}>12:00</td>
                                </tr>
                            </div>
                        </tbody>
                    </table>}
                    Pagination={{defaultCurrent:1, 
                        total:this.state.count, 
                        showSizeChanger:true, 
                        showTotal :(total) => `Total ${total} items`,
                        showQuickJumper:true}}
                />
                <AddADSynchronizationModal
                    wrappedComponentRef={this.saveFormRef}
                    data={this.state.collectionData}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
export default ADSynchronization;
