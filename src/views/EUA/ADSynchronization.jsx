import React, { Component } from 'react';
import { Button, Table, Dropdown, Menu, Popconfirm, Icon, Tooltip} from 'antd';
import styleObj from './EUADetail.css';
import AddADSynchronizationModal from './AddADSynchronizationModal';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
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
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        
        this.state = {
            collectionData: {},
            dataSource: Array(50).fill({
                key:0,
                ADName:'南区AD',
                enableAD:'否',
                serverType:890,
                ADIP:'10.99.00.88'
            }),
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
        const { intl } = this.props;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        const columns = [{
            title: intl.formatMessage({id: 'EUA_ADName'}),
            dataIndex: 'ADName'
        }, {
            title: intl.formatMessage({id: 'EUA_EnableAD'}),
            dataIndex: 'enableAD'
        }, {
            title: intl.formatMessage({id: 'EUA_ServerType'}),
            dataIndex: 'serverType'
        }, {
            title: intl.formatMessage({id: 'EUA_ADIP'}),
            dataIndex: 'ADIP'
        },
        {
            title:intl.formatMessage({id: 'Operate'}),
            dataIndex: 'operate',
            render: (_text, record) => {
                return (
                    this.state.dataSource.length >= 1
                        ? (
                            
                            <div className={styleObj.operationDiv}>
                                <Tooltip placement="bottom" title={intl.formatMessage({id: 'Edit'})} className={styleObj.editDiv}>
                                    <Icon type="edit" theme="twoTone"/>
                                </Tooltip>
                               
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                    <Tooltip placement="bottom" title={intl.formatMessage({id: 'Delete'})} className={styleObj.delDiv}>
                                        <Icon type="delete" theme="twoTone" className={styleObj.deleteIcon}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                        ) : null
                );
            }
        }
        ];
        return(
            <div className={styleObj.ADConfig}>
                <div className={styleObj.btnGroup}>
                    <Button type="primary" className={styleObj.addBtn} onClick={this.showModal}><FormattedMessage id="Add"/></Button>
                    <Button className={styleObj.delBtn}><FormattedMessage id="Delete"/></Button>
                    <Dropdown overlay={menu}>
                        <Button><FormattedMessage id="More"/></Button>
                    </Dropdown>
                </div>
                
                <Table  rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={this.state.dataSource} 
                    size="small" 
                    expandedRowRender={record => <table className={styleObj.detailTable} cellSpacing="20"> 
                        <tbody>
                            <div className={styleObj.tr}>
                                <tr>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_ADName"/> </td>
                                    <td className={styleObj.content}>UDP</td>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_ADFilter"/></td>
                                    <td className={styleObj.content}>obiectClass=commonobiect</td>
                                </tr>
                            </div>
                            <div className={styleObj.tr}>
                                <tr>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_EnableAD"/></td>
                                    <td className={styleObj.content}>否</td>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_EnableEncryption"/></td>
                                    <td className={styleObj.content}>否</td>
                                </tr>
                            </div>
                            <div className={styleObj.tr}>
                                <tr>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_ADIP"/></td>
                                    <td className={styleObj.content}>200.09.89.00, 200.99.99.99</td>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_AutoSync"/></td>
                                    <td className={styleObj.content}>是</td>
                                </tr>
                            </div>
                            <div className={styleObj.tr}>
                                <tr >
                                    <td className={styleObj.title}><FormattedMessage id="EUA_ADIPPort"/></td>
                                    <td className={styleObj.content}>拒绝新注册</td>
                                    <td className={styleObj.title}><FormattedMessage id="EUA_NextAutoSync"/></td>
                                    <td className={styleObj.content}>12:00</td>
                                </tr>
                            </div>
                        </tbody>
                    </table>}
                    pagination={{defaultCurrent:1, 
                        total:this.state.dataSource.length, 
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
export default injectIntl(ADSynchronization);
