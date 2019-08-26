// 业务地址
import React, { Component } from 'react';
import { Button, Table, Popconfirm, Icon } from 'antd';
import styleObj from './EUADetail.css';
import ServiceAddressModal  from './ServiceAddressModal';
class ServiceAddress extends Component {
    constructor() {
        super();
        this.columns = [{
            title: '地址',
            dataIndex: 'IP'
        }, {
            title: 'LDAP端口',
            dataIndex: 'LDAP'
        }, {
            title: '备注',
            dataIndex: 'remarks'
        }, {
            title: '操作',
            dataIndex: 'operate',
            render: (_text, record) => {
                return (
                    this.state.dataSource.length >= 1
                        ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <div>
                                    <Icon type="delete" theme="twoTone" className={styleObj.deleteIcon}/>
                                    <div>删除</div>
                                </div>
                            </Popconfirm>
                        ) : null
                );
            }
        }
        ];
        this.state = {
            collectionData: {},
            dataSource: [{
                key:0,
                IP:'10.99.00.88',
                LDAP:890,
                remarks:'_'
            }],
            count:1,
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
         this.setState({ collectionData: { serveName: '', remark: '', key: this.state.count }, visible: true });
     }
     render() {
         const rowSelection = {
             onChange: (selectedRowKeys, selectedRows) => {
                 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
             }
         };
         return (
             <div className={styleObj.serviceAddress}>
                 <div className={styleObj.btnGroup}>
                     <Button type="primary" className={styleObj.addBtn} onClick={this.showModal}>添加</Button>
                     <Button>删除</Button>
                 </div>
                 <Table  
                     rowSelection={rowSelection} 
                     columns={this.columns} 
                     dataSource={this.state.dataSource} 
                     pagination={false} 
                     size="small"
                 />
                 <ServiceAddressModal
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
export default ServiceAddress;
