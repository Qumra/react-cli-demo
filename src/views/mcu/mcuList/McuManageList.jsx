import React, { Component, Fragment } from 'react';
import { Table, Icon, Dropdown, Button, Input, Menu, message, Pagination, Tooltip } from 'antd';
import cssObj from './McuManageList.css';
import { zh_CN_Device } from '@/locale/zh_CN';
import { en_US_Device } from '@/locale/en_US';
import { setLocale, t } from '@/config/i18n';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import ResizeableTitle from '@/components/ResizeableTitle';
import DelModel from '../components/DelModel';
import StopOrder from '@/images/stopOrder.svg';
import More from '@/images/eua_more.svg';
const {Search} = Input;
class McuManageList extends Component {
    constructor(props) {
        super(props);
        // match = props.match;
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);

        this.state = {
            columns: this.columns,
            collectionData: {},
            dataSource: [],
            count: 1,
            selectedRowKeys: [],
            selectRecord: {},
            hasData: false,
            emptyData: false,
            delModel: false,
            delModalMore: false,
            mcuDevices: [],
            total:0,
            totalPages:0,
            searchValue:''
        };
    }

    //渲染前调用  
    componentWillMount() {
        this.getMcuDevices('name', 0, 10);
    }
    //获取设备信息
    getMcuDevices = (sort, pageNumber, pageSize) => {
        let statusCodeSuccess = 200;
        let queryAllMcuCallBack = res => {
            if(res === undefined || res.status === 401) {//鉴权未通过 返回登录
                this.props.history.push({pathname:'/'});
            }else if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                if (res.data.totalElements !== 0) {
                    const mcuDevices  = res.data.content;
                    let data = [];
                    for (let i = 0; i < mcuDevices.length; i++) {
                        const item = {
                            index: i,
                            key: mcuDevices[i].id,
                            MCUName: mcuDevices[i].mcu.name,
                            deviceModel: mcuDevices[i].mcu.mcuType,
                            IP: mcuDevices[i].mcu.ipAddress,
                            MCUStatus: mcuDevices[i].status
                        };
                        data.push(item);
                    }
                    this.setState({
                        dataSource: data,
                        hasData: true,
                        mcuDevices,
                        total:res.data.totalElements,
                        totalPages:res.data.totalPages

                    });
                } else {
                    this.setState({
                        dataSource: [],
                        emptyData: true,
                        total:0
                    });
                }

            }
        };
        let pageTable = {
            PageNumber:pageNumber ? pageNumber : 0,
            PageSize:pageSize ? pageSize : 10
        };
        csm.registOpCallback('queryAllMcu', queryAllMcuCallBack);
        csm.queryAllMcu(sort, pageTable);
    }
     //搜索
     SearchMcu = (value, pageNumber, pageSize) => {
         let statusCodeSuccess = 200;
         let SeachMcuCallBack = res => {
             console.log(res);
             if(res === undefined || res.status === 401) {//鉴权未通过 返回登录
                 this.props.history.push({pathname:'/'});
             }else if (res.status !== statusCodeSuccess) {
                 console.log('请求失败');
             } else {
                 console.log('请求成功');
                 if (res.data.totalElements !== 0) {
                     const mcuDevices  = res.data.content;
                     let data = [];
                     for (let i = 0; i < mcuDevices.length; i++) {
                         const item = {
                             index: i,
                             key: mcuDevices[i].id,
                             MCUName: mcuDevices[i].mcu.name,
                             deviceModel: mcuDevices[i].mcu.mcuType,
                             IP: mcuDevices[i].mcu.ipAddress,
                             MCUStatus: mcuDevices[i].status
                         };
                         data.push(item);
                     }
                     this.setState({
                         dataSource: data,
                         hasData: true,
                         mcuDevices,
                         total:res.data.totalElements,
                         totalPages:res.data.totalPages,
                         searchValue:value

                     });
                 } else {
                     this.setState({
                         dataSource: [],
                         emptyData: true,
                         total:0,
                         searchValue:value
                     });
                 }

             }
         };
         let pageTable = {
             PageNumber:pageNumber ? pageNumber : 0,
             PageSize:pageSize ? pageSize : 10
         };
         csm.registOpCallback('queryMcuByname', SeachMcuCallBack);
         csm.queryMcuByname(value, pageTable);
     }
     // 设置选择记录
     selectedRow(record) {
         this.setState({
             selectRecord: record
         });
     }
     toPage=(value, pageNumber, pageSize)=>{
         if(value) {
             this.SearchMcu(value, pageNumber, pageSize);
         }else{
             this.getMcuDevices('name', pageNumber, pageSize);
         }
     }
    // 删除表格中的一条数据
    Delete = (id) => {
        let statusCodeSuccess = 200;
        let delMcu = res => {
            console.log(res);
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                // console.log(res.request.response);
                console.log('请求成功');
                message.success(this.props.intl.formatMessage({ id: 'MCU_delMcuSuccess' }));
                this.getMcuDevices('name');

            }
        };
        csm.registOpCallback('delMcu', delMcu);
        csm.delMcu(id);
    }
    // 批量删除
    DeleteList = (delList) => {
        let statusCodeSuccess = 200;
        let DeleteListcallback = res => {
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                console.log(res.request.response);
                console.log('请求成功');
                message.success(this.props.intl.formatMessage({ id: 'MCU_delMcuSuccess' }));
                this.getMcuDevices('name');

            }
        };
        csm.registOpCallback('delMcuMore', DeleteListcallback);
        csm.delMcuMore(delList);
    }
    // meau的点击事件
    handleMenuClick = (e) => {
        if (e.key === '5') {
            // 删除
            this.setState({ delModel: true });

        }
    }
    // 删除单个弹窗的确认事件
    showDeleteConfirm = (flag) => {
       
        if (flag) {
            //后台删除用户接口
            console.log(this.state.selectRecord);
            this.Delete(this.state.selectRecord.key);
        }
        this.setState({
            delModel: false
        });
    }
    // 表格多选框事件
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    findElem = (delList, arrayToSearch, val) => {
        let seleList = [];
        for (let i = 0; i < delList.length; i++) {
            for (let j = 0; j < arrayToSearch.length; j++) {
                if (delList[i] === arrayToSearch[j][val]) {
                    seleList.push(arrayToSearch[j]);
                }
            }
            
        }
        return seleList;
    }
        // 批量删除
        showDeleteConfirmMore = (flag) => {
            const delKeys = this.state.selectedRowKeys;
            console.log(delKeys);
            if (flag && delKeys.length > 0) {
                if (delKeys.length === 1) {
                    this.Delete(delKeys[0]);

                } else {
                    // 批量删除多个
                    console.log(delKeys);
                    this.DeleteList(delKeys);
                }
            }
            this.setState({
                delModalMore: false,
                selectedRowKeys:[]
            });
        }
        columns = [{
            title: this.props.intl.formatMessage({ id: 'MCU_MCUName' }),
            dataIndex: 'MCUName',
            width: 200,
            render: (text, record) => <font onClick={this.click.bind(this, record)} className={cssObj.mcuName} title={text}>{text}</font>
        }, {
            title: this.props.intl.formatMessage({ id: 'MCU_MCUStatus' }),
            dataIndex: 'MCUStatus',
            width: 200,
            render: (record) => {
                return (
                    <div className={cssObj.mcuStatus}>
                        <div className={cssObj.mcuStatusBtn} style={{background:record.gkState ?  'url(' + require('../../../../images/GK2.png') + ') no-repeat 100% / 100%' : 'url(' + require('../../../../images/GK1.png') + ') no-repeat 100% / 100%'}}></div>
                        <div className={cssObj.mcuStatusBtn} style={{background:record.sipState ? 'url(' + require('../../../../images/SIP2.png') + ') no-repeat 100% / 100%' : 'url(' + require('../../../../images/SIP1.png') + ') no-repeat 100% / 100%'}}></div>
                        <div className={cssObj.mcuStatusBtn} style={{background:record.online ? 'url(' + require('../../../../images/SMC2.png') + ') no-repeat 100% / 100%' : 'url(' + require('../../../../images/SMC1.png') + ') no-repeat 100% / 100%'}}></div>
                        <Icon type="exclamation-circle" theme="filled" style={{ color: '#F34B4B', marginLeft: '10px', width:'14.2', height:'14.2' }}/>
                    </div>
                );
            }
        }, {
            title: this.props.intl.formatMessage({ id: 'MCU_Model' }),
            dataIndex: 'deviceModel',
            width: 200
        }, {
            title: this.props.intl.formatMessage({ id: 'MCU_IPAddress' }),
            dataIndex: 'IP',
            width: 200
        },
        {
            title: this.props.intl.formatMessage({ id: 'Operate' }),
            dataIndex: 'operate',
            width: 200,
            render: (_text, record) => {
                return (
                    this.state.dataSource.length >= 1
                        ? (

                            <div className={cssObj.operationDiv}>
                                <div style={{ textAlign: 'center', marginRight: '20px' }} onClick={this.pushEdit.bind(this, record)}>
                                    <Tooltip placement="topLeft" title={<FormattedMessage id="MCU_EditMCU"/>}>
                                        <Icon type="edit" theme="twoTone" />
                                    </Tooltip>
                                </div>
                                <div style={{ textAlign: 'center', marginRight: '20px' }}>
                                    <Tooltip placement="topLeft" title={<FormattedMessage id="MCU_DisScheduling"/>}>
                                        <Icon component={()=><StopOrder  width="18px" height="18px" fill="#0D94FF"  />} />
                                    </Tooltip>
                                </div>
                                <div className={cssObj.moreDiv}>
                                    <Dropdown overlay={this.menu} trigger={['hover']}>
                                        <Icon component={()=><More  width="18px" height="18px" fill="#0D94FF"  />} onClick={this.selectedRow.bind(this, record)}/>
                                    </Dropdown>
                                </div>
                            </div>
                        ) : null
                );
            }
        }
        ];
        components = {
            header: {
                cell: ResizeableTitle
            }
        };
        menuBtn = (
            <Menu onClick={this.handleMenuClickBtn}>
                <Menu.Item key="1"><FormattedMessage id="MCU_ChangeLink" /></Menu.Item>
                <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig" /></Menu.Item>
                <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig" /></Menu.Item>
                <Menu.Item key="4"><FormattedMessage id="MCU_Diagnostics" /></Menu.Item>
            </Menu>
        );
        menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><FormattedMessage id="MCU_ChangeLink" /></Menu.Item>
                <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig" /></Menu.Item>
                <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig" /></Menu.Item>
                <Menu.Item key="4"><FormattedMessage id="MCU_Diagnostics" /></Menu.Item>
                <Menu.Item key="5"><FormattedMessage id="Delete" /></Menu.Item>
            </Menu>
        );
        handleResize = index => (e, { size }) => {
            this.setState(({ columns }) => {
                const nextColumns = [...columns];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width
                };
                return { columns: nextColumns };
            });
        };

        // 跳转到添加页面
        pushAdd = () => {
            this.props.history.push({ pathname: '/main/Device/AddMcu' });
        }
        // 跳转到编辑页面
        pushEdit = (item) => {
            let baseInfo = this.state.mcuDevices[item.index];
            console.log(this.state.mcuDevices[item.index]);
            this.props.history.push({ pathname: '/main/Device/MCUDetail/BasicInfoEdit', state: baseInfo });
        }
        // 点击表格的每条名称
        click = (item) => {
            this.props.history.push({ pathname: '/main/Device/MCUDetail/' + item.key + '/BasicInfo', state:this.state.mcuDevices[item.index]});
        }

        render() {
            const { intl } = this.props;
            const rowSelection = {
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: this.onSelectChange
                // onChange: (selectedRowKeys, selectedRows) => {
                //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //     this.setState({
                //         selectedRowKeys:selectedRows.key
                //     });
                // }
            };
            const hasSelected = this.state.selectedRowKeys.length > 0;

            const columns = this.state.columns.map((col, index) => ({
                ...col,
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index)
                })
            }));
            return (
                this.state.emptyData ? (
                    <Fragment>
                        <div className={cssObj.mcuContent}>
                            <div className={cssObj.mcuContentTitle}>
                                <FormattedMessage id="MCU_ListTitle" />
                                <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon} />
                            </div>
                            <div className={cssObj.main}>
                                <div style={{ textAlign: 'center', marginTop: '18.2%' }}>
                                    <div className={cssObj.imgDiv}></div>
                                    <span style={{
                                        fontSize: 20,
                                        color: '#333333'
                                    }}
                                    >{t('Mcu_empty')}</span><br /><br />
                                    <span>
                                        <Link to={
                                            { pathname: '/main/Device/AddMcu' }
                                        }
                                        >
                                            <Button type="primary" style={{ width: 120, height: 32 }} >{t('Add')}</Button>
                                        </Link>
                                        {/* onClick={() => this.setState({userBatchModal:true})} */}
                                        <Button type="default" style={{ marginLeft: '8%', width: 120, height: 32 }}>{t('import')}</Button></span>
                                </div>
                            </div>
                        </div>
                        {/* <DataBatchModal flag="user" dataBatchModal={this.state.userBatchModal} showDataBatchModal={this.showUserBatchModal} /> */}
                    </Fragment>) : (
                    !this.state.hasData ? 'Loading' : (<div className={cssObj.mcuManage}>
                        <div className={cssObj.mcuContent}>
                            <div className={cssObj.mcuContentTitle}>
                                <FormattedMessage id="MCU_ListTitle" />
                                <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon} />
                            </div>
                            <div className={cssObj.main}>
                                <div className={cssObj.mcuContentMid}>
                                    <div className={cssObj.mcuContentMidpadding}>
                                        <div className={cssObj.mcuContentMidHeader}>
                                            <div className={cssObj.btnGroup}>
                                                <Button type="primary" className={cssObj.addBtn} onClick={this.pushAdd}><FormattedMessage id="Add" /></Button>
                                                <Button
                                                    className={cssObj.delBtn}
                                                    onClick={() => hasSelected ? this.setState({ delModalMore: true }) : message.info(intl.formatMessage({ id: 'selectMcu' }))}
                                                ><FormattedMessage id="Delete" /></Button>
                                                <Dropdown overlay={this.menuBtn}>
                                                    <Button><FormattedMessage id="More" /></Button>
                                                </Dropdown>
                                            </div>
                                            <div  className={cssObj.searchDiv}>
                                                <Search  onSearch={(value) => this.SearchMcu(value)} 
                                                    placeholder={this.props.intl.formatMessage({id:'MCU_MCUName'})} 
                                                    className={cssObj.searchInput}
                                                />
                                            </div>
                                        </div>
                                        <div style={{overflowX:'hidden', overflowY:'auto', minHeight:'65vh'}}>
                                            <Table 
                                                components={this.components} 
                                                rowSelection={rowSelection} 
                                                columns={columns} 
                                                dataSource={this.state.dataSource} 
                                                rowKey={(record) =>(record.key)} 
                                                pagination={false}
                                            /> 
                                        </div>
                                        <Pagination className={cssObj.pages} size="" showTotal={total=>this.props.intl.formatMessage({id:'SC_total'}) + ':' + total} 
                                            defaultCurrent={1} total={this.state.total}  showQuickJumper={this.state.totalPages > 1} showSizeChanger
                                            onChange={(page, pageSize)=>{this.toPage(this.state.searchValue, page - 1, pageSize);}}
                                            onShowSizeChange={(current, size)=>{this.toPage(this.state.searchValue, current - 1, size);}}
                                        /> 
                                       
                                        <DelModel delModel={this.state.delModel} showDeleteConfirm={this.showDeleteConfirm} />
                                        <DelModel delModel={this.state.delModalMore} showDeleteConfirm={this.showDeleteConfirmMore} />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>))
            );
        }
}
export default injectIntl(McuManageList);
