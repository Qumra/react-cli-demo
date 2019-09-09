import React, { Component, Fragment } from 'react';
import { Table, Icon, Dropdown, Button, Input, Menu, message } from 'antd';
import cssObj from './McuManageList.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale, t} from '@/config/i18n';
import {Link} from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import ResizeableTitle from '@/components/ResizeableTitle';
import DelModel from '../components/DelModel';

class McuManageList extends Component {
    constructor(props) {
        super(props);
        // match = props.match;
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
       
        this.state = {
            columns:this.columns,
            collectionData: {},
            dataSource: [],
            count:1,
            selectedRowKeys: [],
            selectRecord:{},
            hasData:false,
            emptyData:false,
            delModel:false,
            delModalMore:false,
            mcuDevices:[]
        };
    }
    
    //渲染前调用  
    componentWillMount() {
        this.getMcuDevices();
    }
    //获取设备信息
    getMcuDevices = () =>{
        let statusCodeSuccess = 200;
        let queryAllMcuCallBack = res => {
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                if(res.data.page.totalElements !== 0) {
                    // console.log(res.data._embedded.mcuDevices);
                    const {mcuDevices} = res.data._embedded;
                    let data = [];
                    for(let i = 0;i < mcuDevices.length;i++) {
                        let ids = mcuDevices[i]._links.self.href.split('/');
                        let id = ids[ids.length - 1];
                        const item = {
                            index:i,
                            key:id,
                            MCUName:mcuDevices[i].mcu.name,
                            deviceModel:mcuDevices[i].mcu.mcuType,
                            IP:mcuDevices[i].mcu.ipAddress,
                            MCUStatus:mcuDevices[i].status
                        }; 
                        data.push(item);
                    }
                    this.setState({
                        dataSource:data,
                        hasData:true,
                        mcuDevices
                    });
                }else{
                    this.setState({
                        dataSource:[],
                        emptyData:true
                    });
                }
                
            }
        };
        csm.registOpCallback('queryAllMcu', queryAllMcuCallBack);
        csm.queryAllMcu();
    }
    // 设置选择记录
    selectedRow(record) {
        this.setState({
            selectRecord:record
        });
    }
    // 删除表格中的一条数据
    Delete=(id)=>{
        let statusCodeSuccess = 200;
        let delMcu = res => {
            console.log(res);
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                console.log(res.request.response);
                console.log('请求成功');
                message.success(this.props.intl.formatMessage({id: 'MCU_delMcuSuccess'}));
                this.getMcuDevices();
                
            }
        };
        csm.registOpCallback('delMcu', delMcu);
        csm.delMcu(id);
    }
    // meau的点击事件
    handleMenuClick=(e)=>{
        if(e.key === '5') {
            // 删除
            this.setState({delModel:true});
           
        }
    }
    // 删除弹窗的确认事件
    showDeleteConfirm = (flag) => {

        if(flag) {
            //后台删除用户接口
            console.log(this.state.selectRecord);
            this.Delete(this.state.selectRecord.key);
        }
        this.setState({
            delModel:false            
        });
    }
    // 表格多选框事件
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    showDeleteConfirmMore = (flag)=>{
        const delKeys = this.state.selectedRowKeys;
        if(flag && delKeys.length > 0) {
            if(delKeys.length === 1) {
                this.Delete(delKeys[0]);
            }else{
                // 批量删除多个
            }
        }
        this.setState({
            delModalMore:false            
        });
    }
    columns = [{
        title: this.props.intl.formatMessage({id: 'MCU_MCUName'}),
        dataIndex: 'MCUName',
        width:200,
        render:(text, record)=><font onClick={this.click.bind(this, record)} className={cssObj.mcuName}>{text}</font>
    }, {
        title: this.props.intl.formatMessage({id: 'MCU_MCUStatus'}),
        dataIndex: 'MCUStatus',
        width:200,
        render:()=>{
            return (
                <div className={cssObj.mcuStatus}>
                    <div className={cssObj.mcuStatusBtn}>GK</div>
                    <div className={cssObj.mcuStatusBtn}>SIP</div>
                    <div className={cssObj.mcuStatusBtn}>SMC</div>
                    <Icon type="warning"  style={{color:'#D0021B', marginLeft:'10px'}} />
                </div>
            );
        }
    }, {
        title: this.props.intl.formatMessage({id: 'MCU_Model'}),
        dataIndex: 'deviceModel',
        width:200
    }, {
        title: this.props.intl.formatMessage({id: 'MCU_IPAddress'}),
        dataIndex: 'IP',
        width:200
    },
    {
        title: this.props.intl.formatMessage({id: 'Operate'}),
        dataIndex: 'operate',
        width:200,
        render: (_text, record) => {
            return (
                this.state.dataSource.length >= 1
                    ? (
                        
                        <div className={cssObj.operationDiv}>
                            <div style={{textAlign:'right', marginRight:'20px'}} onClick={this.pushEdit.bind(this, record)}>
                                <Icon type="edit" theme="twoTone"/>
                                <div><Button><FormattedMessage id="MCU_EditMCU"/></Button> </div>
                            </div>
                            <div style={{textAlign:'right', marginRight:'20px'}}>
                                <Icon type="delete" theme="twoTone" className={cssObj.deleteIcon}/>
                                <div><Button><FormattedMessage id="MCU_DisScheduling"/></Button></div>
                            </div>
                            <div className={cssObj.moreDiv}>
                                <Dropdown overlay={this.menu} trigger={['hover']}>
                                    <Icon type="ellipsis" theme="outlined" onMouseOver={this.selectedRow.bind(this, record)}/>
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
            <Menu.Item key="1"><FormattedMessage id="MCU_ChangeLink"/></Menu.Item>
            <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig"/></Menu.Item>
            <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig"/></Menu.Item>
            <Menu.Item key="4"><FormattedMessage id="MCU_Diagnostics"/></Menu.Item>
        </Menu>
    );
    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1"><FormattedMessage id="MCU_ChangeLink"/></Menu.Item>
            <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig"/></Menu.Item>
            <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig"/></Menu.Item>
            <Menu.Item key="4"><FormattedMessage id="MCU_Diagnostics"/></Menu.Item>
            <Menu.Item key="5"><FormattedMessage id="Delete"/></Menu.Item>
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
    pushAdd=()=>{
        this.props.history.push({pathname:'/main/Device/AddMcu'});
    }
    // 跳转到编辑页面
    pushEdit=(item)=>{
        let ids = this.state.mcuDevices[item.index]._links.self.href.split('/');
        let id = ids[ids.length - 1];
        let baseInfo = Object.assign(this.state.mcuDevices[item.index], {key:id});
        console.log(this.state.mcuDevices[item.index]);
        this.props.history.push({pathname:'/main/Device/MCUDetail/BasicInfoEdit', state:baseInfo});
    }
    // 点击表格的每条名称
    click = (item)=>{
        this.props.history.push({pathname:'/main/Device/MCUDetail',  state:this.state.mcuDevices[item.index]});
    }
    
    onChangeSearch=(e)=>{
        console.log(e.target.value);
    }
    render() {
        const { intl} = this.props;
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: this.onSelectChange
        };
        const hasSelected = this.state.selectedRowKeys.length > 0;

        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index)
            })
        }));
        return(
            this.state.emptyData ? (
                <Fragment>
                    <div style={{textAlign:'center', marginTop:'30%'}}>
                        <span style={{fontSize: 20,
                            color:'#333333'}}
                        >{t('Mcu_empty')}</span><br/><br/>
                        <span>
                            <Link to={
                                {pathname: '/main/Device/AddMcu'}
                            }
                            >
                                <Button type="primary" style={{width:'15%'}} >{t('Add')}</Button>
                            </Link>
                            {/* onClick={() => this.setState({userBatchModal:true})} */}
                            <Button type="default"  style={{marginLeft:'8%', width:'15%'}}>{t('import')}</Button></span>
                    </div>
                    {/* <DataBatchModal flag="user" dataBatchModal={this.state.userBatchModal} showDataBatchModal={this.showUserBatchModal} /> */}
                </Fragment>) : (
                !this.state.hasData ? 'Loading' : (<div className={cssObj.mcuManage}>
                    <div className={cssObj.mcuContent}>
                        <div className={cssObj.mcuContentTitle}>
                            <FormattedMessage id="MCU_ListTitle"/>
                            <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                        </div>
                        <div className={cssObj.mcuContentMid}>
                            <div className={cssObj.mcuContentMidpadding}>
                                <div className={cssObj.mcuContentMidHeader}>
                                    <div className={cssObj.btnGroup}>
                                        <Button type="primary" className={cssObj.addBtn} onClick={this.pushAdd}><FormattedMessage id="Add"/></Button>
                                        <Button 
                                            className={cssObj.delBtn}
                                            onClick={()=>hasSelected ? this.setState({delModalMore:true}) : message.info(intl.formatMessage({id: 'selectMcu'}))}
                                        ><FormattedMessage id="Delete"/></Button>
                                        <Dropdown overlay={this.menuBtn}>
                                            <Button><FormattedMessage id="More"/></Button>
                                        </Dropdown>
                                    </div>
                                    <div >
                                        <Input
                                            className={cssObj.searchInput}
                                            placeholder={this.props.intl.formatMessage({id: 'MCU_MCUName'})}
                                            prefix={<Icon type="search" className={cssObj.searchIcon}/>}
                                            onChange={this.onChangeSearch}
                                        />
                                    </div>
                                </div>
                                <Table  
                                    rowSelection={rowSelection} 
                                    columns={columns} 
                                    components={this.components}
                                    dataSource={this.state.dataSource} 
                                    pagination={{defaultCurrent:1, 
                                        total:this.state.dataSource.length, 
                                        showSizeChanger:true, 
                                        showTotal :(total) => `Total ${total} items`,
                                        showQuickJumper:true}}
                                    size="small"
                                    onRow={this.onClickRow}
                                />
                                <DelModel delModel={this.state.delModel} showDeleteConfirm={this.showDeleteConfirm}/>
                                <DelModel delModel={this.state.delModalMore} showDeleteConfirm={this.showDeleteConfirmMore}/>
                            </div>
                        </div>
                    </div>
                </div>))
        );
    }
}
export default injectIntl(McuManageList);
