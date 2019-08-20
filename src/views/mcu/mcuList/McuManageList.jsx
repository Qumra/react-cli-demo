import React, { Component } from 'react';
import { Table, Icon, Dropdown, Button, Input, Menu } from 'antd';
import cssObj from './McuManageList.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import ResizeableTitle from '@/components/ResizeableTitle';
import Item from 'antd/lib/list/Item';
const {Search} = Input;
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"><FormattedMessage id="MCU_ChangeLink"/></Menu.Item>
        <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig"/></Menu.Item>
        <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig"/></Menu.Item>
        <Menu.Item key="4"><FormattedMessage id="MCU_Diagnostics"/></Menu.Item>
        <Menu.Item key="5"><FormattedMessage id="Delete"/></Menu.Item>
    </Menu>
);
function handleMenuClick(e) {
    console.log('click', e);
}
class McuManageList extends Component {
    constructor(props) {
        super(props);
        // match = props.match;
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
       
        this.state = {
            columns:this.columns,
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
    componentWillMount() {//渲染前调用  
        this.getMcuDevices();
    }
    getMcuDevices = () =>{//获取设备信息
        let queryAllMcuCallBack = res => {
            console.log(res);
            if (res.status !== 200) {
                console.log('请求失败');
            } else {
                // console.log(res.request.response);
                console.log(res.data._embedded.mcuDevices);

                console.log('请求成功');
                let data = [];
                const {mcuDevices} = res.data._embedded;
                for(let i = 0;i < mcuDevices.length;i++) {
                    const item = {
                        key:i,
                        MCUName:mcuDevices[i].mcu.name,
                        deviceModel:'',
                        IP:mcuDevices[i].mcu.ipAddress,
                        MCUStatus:mcuDevices[i].status
                    }; 
                    data.push(item);
                }
                this.setState({
                    dataSource:data
                });
            }
        };
        csm.registOpCallback('queryAllMcu', queryAllMcuCallBack);
        csm.queryAllMcu();
    }
    columns = [{
        title: this.props.intl.formatMessage({id: 'MCU_MCUName'}),
        dataIndex: 'MCUName',
        width:200
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
                            <div style={{textAlign:'right', marginRight:'20px'}}>
                                <Icon type="edit" theme="twoTone"/>
                                <div><Button><FormattedMessage id="MCU_EditMCU"/></Button> </div>
                            </div>
                            <div style={{textAlign:'right', marginRight:'20px'}}>
                                <Icon type="delete" theme="twoTone" className={cssObj.deleteIcon}/>
                                <div><Button><FormattedMessage id="MCU_DisScheduling"/></Button></div>
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
    components = {
        header: {
            cell: ResizeableTitle
        }
    };
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
    // 点击表格的每行
    onClickRow = (record) => {
        // let id =record.key
        return {
            onClick: () => {
                if (record.key > -1) {
                    this.props.history.push({pathname:'/main/Device/MCUDetail', state:record});
                    // this.setState({ delDisable: false, isDisable: false, rowId: record.key });
                }
            }
        };
    }
    onChangeSearch=(e)=>{
        console.log(e.target.value);
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index)
            })
        }));
        return(
            <div className={cssObj.mcuManage}>
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
                                    <Button className={cssObj.delBtn}><FormattedMessage id="Delete"/></Button>
                                    <Dropdown overlay={menu}>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(McuManageList);
