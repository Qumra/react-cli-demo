// 业务地址
import React, { Component } from 'react';
import { Button, Table, Popconfirm, Icon } from 'antd';
import styleObj from './EUADetail.css';
import ServiceAddressModal  from './ServiceAddressModal';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
class ServiceAddress extends Component {
    constructor() {
        super();
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
       
        this.state = {
            collectionData: {},
            dataSource: [{
                key:0,
                IP:'10.99.00.88',
                LDAP:890,
                remarks:'_'
            }],
            count:1,
            visible:false,
            current:1
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
         this.setState({ collectionData: { IP: '', LDAP:'', remarks: '', key: this.state.count }, visible: true });
     }
     changePage=()=>{
         console.log('page');
     }
     render() {
         const { intl } = this.props;
         const rowSelection = {
             onChange: (selectedRowKeys, selectedRows) => {
                 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
             }
         };
         const columns = [{
             title: intl.formatMessage({id: 'EUA_Address'}),
             dataIndex: 'IP'
         }, {
             title:intl.formatMessage({id: 'EUA_LDAPPort'}),
             dataIndex: 'LDAP'
         }, {
             title: intl.formatMessage({id: 'EUA_Remarks'}),
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
                                     <div> <FormattedMessage id="Delete"/></div>
                                 </div>
                             </Popconfirm>
                         ) : null
                 );
             }
         }
         ];
         return (
             <div className={styleObj.serviceAddress}>
                 <div className={styleObj.btnGroup}>
                     <Button type="primary" className={styleObj.addBtn} onClick={this.showModal}> <FormattedMessage id="Add"/></Button>
                     <Button> <FormattedMessage id="Delete"/></Button>
                 </div>
                 <Table  
                     rowSelection={rowSelection} 
                     columns={columns} 
                     dataSource={this.state.dataSource} 
                     pagination={{defaultCurrent:1, 
                         total:this.state.count, 
                         showSizeChanger:true, 
                         showTotal :(total) => `Total ${total} items`,
                         showQuickJumper:true}}
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
export default injectIntl(ServiceAddress);
