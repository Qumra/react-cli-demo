// 共享组织
import React, { Component } from 'react';
import {Form, Switch, Button, Tree, message } from 'antd';
import cssObj from './EUADetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const {TreeNode} = Tree;
function findElem(arrayToSearch, attr, val) {
    for (let i = 0;i < arrayToSearch.length;i++) {
        if(arrayToSearch[i][attr] === val) {
            return i;
        }
    }
    return -1;
}
const ShareNode = Form.create()(
    class  extends Component {
        constructor() {
            super();
            setLocale('zh-CN', zh_CN_Device);
            setLocale('en-US', en_US_Device);
            this.state = {
                // treeData: this.convert([
                //     { oriName: 'VC', uuid: '0', oriList:['VC1', 'VC2'] },
                //     { oriName: 'AD', uuid: '1', oriList:['AD1', 'AD2'] },
                //     { oriName: 'Tree Node', uuid: '2', oriList:[]}
                // ])
                treeData:[],
                selectData:[],
                hasData:false,
                treeNode:{},
                switchFlag:false
               
            };
        }
        componentWillMount() {//渲染前调用  
            this.getSelectOrg();
        
        }
        getShareAllOrg = ()=>{
            let statusCodeSuccess = 200;
            let queryEuaShareALLOrgcallback = (res) => {
                if (res.status !== statusCodeSuccess) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    console.log(res.data.organizationResultBeanList);
                    this.setState({
                        treeData:this.convert(res.data.organizationResultBeanList),
                        hasData:true
                    });
                    
                }
            };
            csm.registOpCallback('queryEuaShareALLOrg', queryEuaShareALLOrgcallback);
            csm.queryEuaShareALLOrg();
        }
        getSelectOrg=()=>{
            let statusCodeSuccess = 200;
            let queryEuaConfigItemcallback = (res) => {
                if (res.status !== statusCodeSuccess) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    console.log(res.data.data);
                    let {data} = res.data;
                    let selectIndex = findElem(data, 'configName', 'SHARED_OU_LIST');
                    let switchIndex = findElem(data, 'configName', 'IS_CLOSE_QUERY_RIGHT_CONTROL');
                    this.setState({
                        selectData:data[selectIndex],
                        switchData:data[switchIndex]
                        
                    });
                    this.getShareAllOrg();
                }
            };
            let EuaConfigItem = {configName:''};
            csm.registOpCallback('queryEuaConfigItem', queryEuaConfigItemcallback);
            csm.queryEuaConfigItem(EuaConfigItem);
        }
        getShareOneOrg=(id, callback)=>{
            let statusCodeSuccess = 200;
            let queryEuaShareOrgcallback = (res) => {
                if (res.status !== statusCodeSuccess) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    console.log(res.data.organizationResultBeanList);
                    let {treeNode} = this.state;
                    treeNode.children = this.convert(res.data.organizationResultBeanList);
                    this.setState({
                        treeData: [...this.state.treeData]
                    });
                    callback();
                }
            };
            csm.registOpCallback('queryEuaShareOrg', queryEuaShareOrgcallback);
            csm.queryEuaShareOrg(id);
        }
        onswitchChange=(e)=>{
            console.log(e);
     
            this.setState({
                switchFlag:!e
            });
            
        };
   
      
        convert = datas => {
            let newDatas = [];
            datas.forEach(e => {
                newDatas.push({ title: e.ou, key: e.entryUuid, isLeaf:e.ou !== 'VC' && e.orgNameList.length === 1 });
            });
            return newDatas;
        }
        handleSubmit=(e)=>{
            let statusCodeSuccess = 200;
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                console.log(values);
                values.limitSearch =  values.limitSearch === true ? '1' : '0';
                message.config({
                    duration: 5,
                    maxCount: 1
                });
                let updateEuaConfigItemcallback = res=>{
                    if (res.status !== statusCodeSuccess) {
                        console.log('请求失败');
                        message.error(this.props.intl.formatMessage({id: 'ChangeFailed'}));
                    } else {
                        console.log('请求成功');
                        message.info(this.props.intl.formatMessage({id: 'Mcu_ChangeSuccess'}));
                    }
                };
                if (!err) {
                    let {switchData} = this.state;
                    switchData.configValue = values.limitSearch;
                    console.log(this.state.switchData);
                    console.log(this.state.selectData);
                    let euaConfigSwitch = this.state.switchData;
                    let euaConfigSelect = this.state.selectData;
                    csm.registOpCallback('updateEuaConfigItem', updateEuaConfigItemcallback);
                    csm.updateEuaConfigItem([euaConfigSwitch, euaConfigSelect]);
                }
            });
        };
        onLoadData = treeNode =>
            new Promise(resolve => {
                console.log(treeNode);
                this.setState({
                    treeNode:treeNode.props.dataRef
                });
                if (treeNode.props.children) {
                    resolve();
                    return;
                }
                this.getShareOneOrg(treeNode.props.dataRef.key, resolve);
            });
        /*
  * 动态构建机构树形菜单
  * */
        renderTreeNodes = data =>
            data.map(item => {
                if (item.children) {
                    return (
                        <TreeNode title={item.title} key={item.key} dataRef={item} checked={this.state.selectData.configValue.split(',').includes(item.key)}>
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} {...item} dataRef={item} checked={this.state.selectData.configValue.split(',').includes(item.key)}/>;
            });
            onCheck=(checkedKeys)=>{
                console.log(checkedKeys);
                let {selectData} = this.state;
                selectData.configValue = checkedKeys.join(',');
            };
           
            render() {
                const { getFieldDecorator } = this.props.form; 
                const { intl } = this.props;
                console.log(this.state.switchFlag);
                return (
                    !this.state.hasData ? 'loading' : (<div className={cssObj.shareNode}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={cssObj.formHeader}>
                                <FormItem 
                                    label={intl.formatMessage({id: 'EUA_RestrictQuery'})}
                                    colon={false}
                                >
                                    {getFieldDecorator('limitSearch', {
                                        initialValue:this.state.switchData.configValue === '1' ? true : false,
                                        valuePropName: 'checked'
                                    })(
                                        <Switch  onChange={this.onswitchChange}/>
                                    )}
                                
                                </FormItem>
                                <span><FormattedMessage id="EUA_RestrictQueryTip"/></span>
                            </div>
                            <div className={cssObj.formBody}>
                                <Tree showLine checkable 
                                    loadData={this.onLoadData}  
                                    defaultCheckedKeys={this.state.selectData.configValue.split(',')}
                                    onCheck={this.onCheck}
                                    disabled={this.state.switchFlag}
                                    // checkedKeys={this.state.selectData.configValue.split(',')}
                                >{this.renderTreeNodes(this.state.treeData)}</Tree>
                            </div>
                            <div className={cssObj.formFooter}>
                                <div className={cssObj.btnGroup}>
                                    <Button type="primary" htmlType="submit" className={cssObj.saveBtn}><FormattedMessage id="Save"/></Button>
                                    <Button><FormattedMessage id="Cancel"/></Button>
                                </div>
                            </div>
                        </Form>
                    </div>)
                );
            }
    }
);

export default injectIntl(ShareNode);
