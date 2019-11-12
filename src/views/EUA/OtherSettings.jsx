// 其他配置
import React, { Component } from 'react';
import {Form, Input, Button, Select, Tooltip, Icon, message } from 'antd';
import cssObj from './EUADetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale, t} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import validate  from '@/commonJS/validator';
const FormItem = Form.Item;
const {Option} = Select;
const OtherSettings = Form.create()(
    class extends Component {
        constructor() {
            super();
            setLocale('zh-CN', zh_CN_Device);
            setLocale('en-US', en_US_Device);
            this.state = {
                info:{}
            };
        }
        componentWillMount() {
            this.getOtherSet();
        }
        getOtherSet=()=>{
            let callback = res=>{
                let statusCodeSuccess = 200;
                console.log(res.data);
                if (res.status !== statusCodeSuccess) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    this.setState({
                        info:res.data
                    });
                }
            };
            csm.registOpCallback('getEuaResetOther', callback);
            csm.getEuaResetOther();
        };
        handleSubmit=(e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                let callback = res=>{
                    let statusCodeSuccess = 200;
                    console.log(res.data);
                    if (res.status !== statusCodeSuccess) {
                        console.log('请求失败');
                    } else {
                        console.log('请求成功');
                        console.log(res.data);
                        let flag = false;
                        for(let i in res.data) {
                            let keys = Object.keys(res.data[i]);
                            if(res.data[i][keys[0]].code !== 0) {
                                flag = true;
                                if(keys[0] !== 'NTP_ADDRESS') {//对NTP错误做特殊处理
                                    this.props.form.setFields({
                                        [keys[0]]: {
                                            value:values[keys[0]],
                                            // errors: [new Error(res.data[i][keys[0]].msg)]
                                            errors:[new Error(this.props.intl.formatMessage({id: 'Invalid_param'}))]
                                        }
                                    });
                                }else{
                                    this.props.form.setFields({
                                        [keys[0]]: {
                                            value:values[keys[0]],
                                            errors:[new Error(this.props.intl.formatMessage({id: 'NTP_err'}))]
                                        }
                                    });
                                }
                               
                            }
                                
                        }
                        if(!flag) {
                            message.config({
                                duration: 5,
                                maxCount: 1
                            });
                            message.success(this.props.intl.formatMessage({id: 'Mcu_ChangeSuccess'}));
                            this.getOtherSet();
                        }
                    }
                };
                let valuesProps = Object.getOwnPropertyNames(values);
                let infoProps = Object.getOwnPropertyNames(this.state.info);
                let paramList = [];
                let param = {};
                for(let i in valuesProps) {
                    for(let j in infoProps) {
                        if(valuesProps[i] === infoProps[j]) {
                            paramList.push(valuesProps[i]);
                        }
                    }
                }
                console.log(paramList);
                for(let i in paramList) {
                    if(values[paramList[i]] !== this.state.info[paramList[i]]) {
                        param[paramList[i]] = values[paramList[i]];
                    }
                }
                if(!infoProps.includes('NTP_ADDRESS') && values['NTP_ADDRESS']) {
                    param['NTP_ADDRESS'] = values['NTP_ADDRESS'];
                }
                console.log(param);
                if(!err) {
                    csm.registOpCallback('modEuaResetOther', callback);
                    csm.modEuaResetOther(param);
                }
            });
        }
        checkPwdTimes= (rule, val, callback) => {
            let reg = /^\d+$/;//非负整数
            if (!val) {
                callback();
            } else if(!reg.test(val)) {
                callback(t('times0_100'));
            }else{
                if(val < 0 || val > 100) {
                    callback(t('times0_100'));
                } else{
                    callback();
                }
            }
        }
        
        checkNodeName=(rule, val, callback)=>{
            let reg = /^[<>"'&\/+-\\]+$/;
            if (!val) {
                callback();
            } else if(!reg.test(val)) {
                callback();
            }else{
                callback(t('node_rule'));
            }
            
        }
        checkProject=(rule, val, callback)=>{
            let arr = val.split('-');
            if(arr.length !== 2) {
                callback(t('Project_rule'));
                return;
            }
            if(arr[0].length !== arr[1].length && arr[0].length <= 6) {
                callback(t('Project_rule'));
                return;
            }
            if(parseInt(arr[0] >= parseInt(arr[1]))) {
                callback(t('Project_rule'));
                return;
            }
            arr.forEach(element=>{
                if(isNaN(element)) {
                    callback(t('Project_rule'));
                    return;
                }
            });
            callback();
        }

         sortOption =['NULL',
             'cn',
             'commOwner',
             'departmentName',
             'displayName',
             'employeesex',
             'h323IdentitydialedDigits',
             'h323Identityh323_ID',
             'homePhone',
             'ipPhone',
             'localName',
             'mail',
             'mobile',
             'msRTCSIP_PrimaryUserAddress',
             'otherTelephone',
             'otherTelephone2',
             'postalAddress',
             'postalCode',
             'quanpin',
             'SIPIdentityAddress',
             'SIPIdentitySIPURI',
             'sortindex',
             'telephoneNumber',
             'telexNumber',
             'title',
             'TPType',
             'uid'];
         SortRule=['en_US',
             'de_DE',
             'fr_FR',
             'ru_RU',
             'es_ES',
             'zh_HK',
             'zh_TW',
             'zh_CN'];
         render() {
             const { getFieldDecorator } = this.props.form; 
             const { intl } = this.props;
             const formItemLayout = {
                 labelCol: {
                     xs: { span: 4 },
                     sm: { span: 4 }
                 },
                 wrapperCol: {
                     xs: { span: 16 },
                     sm: { span: 16 }
                 }
             };
             return (
                 <div>
                     <div className={cssObj.otherSettings}>
                         <Form  onSubmit={this.handleSubmit}>
                             <div className={cssObj.formContent}>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_DirectorySecurity'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('LDAP_CONNECTION_SECURITY_LEVEL', {
                                             initialValue:this.state.info.LDAP_CONNECTION_SECURITY_LEVEL
                                         })(
                                             <Select>
                                                 <Option value="2">低</Option>
                                                 <Option value="1">中</Option>
                                                 <Option value="0">高</Option>
                                             </Select>
                                         )}
                                     </FormItem>
                                     <Tooltip title="What do you want others to call you?">
                                         <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                     </Tooltip>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_SortRule'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('DEFAULT_COLLATION', {
                                             initialValue: this.state.info.DEFAULT_COLLATION
                                         })(
                                             <Select>
                                                 {this.SortRule.map(collation=>(
                                                     <Option key={collation} value={collation}>{collation}</Option>
                                                 ))}
                                             </Select>
                                         )}
                                     </FormItem>
                                     <Tooltip title="What do you want others to call you?">
                                         <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                     </Tooltip>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_SortingType'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('DEFAULT_SORT_MODE', {
                                             initialValue: this.state.info.DEFAULT_SORT_MODE
                                         })(
                                             <Select>
                                                 <Option value="Ascending">Ascending</Option>
                                                 <Option value="Decreasing">Decreasing</Option>
                                             </Select>
                                         )}
                                     </FormItem>
                                     <Tooltip title="What do you want others to call you?">
                                         <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                     </Tooltip>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_Sortingfield1'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('SORT_FIELD_ONE', {
                                             initialValue: this.state.info.SORT_FIELD_ONE
                                         })(
                                             <Select>
                                                 {this.sortOption.map(sortField=>(
                                                     <Option key={sortField} value={sortField}>{sortField}</Option>)
                                                 )}
                                             </Select>
                                         )}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_Sortingfield2'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('SORT_FIELD_TWO', {
                                             initialValue: this.state.info.SORT_FIELD_TWO
                                         })(
                                             <Select>
                                                 {this.sortOption.map(sortField=>(
                                                     <Option key={sortField} value={sortField}>{sortField}</Option>)
                                                 )}
                                             </Select>
                                         )}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_Sortingfield3'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('SORT_FIELD_THREE', {
                                             initialValue: this.state.info.SORT_FIELD_THREE
                                         })(
                                             <Select>
                                                 {this.sortOption.map(sortField=>(
                                                     <Option key={sortField} value={sortField}>{sortField}</Option>)
                                                 )}
                                             </Select>
                                         )}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_passwordTryTimes'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('PWD_MAXFAILED_NUM', {
                                             initialValue:this.state.info.PWD_MAXFAILED_NUM,
                                             rules: [
                                                 {
                                                     validator: this.checkPwdTimes
                                                 }
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                     </FormItem>
                                     <Tooltip title="What do you want others to call you?">
                                         <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                     </Tooltip>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_Telepresence'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('EC_NODE_NAME', {
                                             initialValue:this.state.info.EC_NODE_NAME,
                                             rules:[
                                                 {max: 64, message:intl.formatMessage({id: 'Max64'}) },
                                                 {required: true, message: t('enter_EC_NODE')},
                                                 {validator:this.checkNodeName}
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_ADNodeName'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('AD_SYNC_NODE_NAME', {
                                             initialValue:this.state.info.AD_SYNC_NODE_NAME,
                                             rules:[
                                                 {max: 64, message:intl.formatMessage({id: 'Max64'}) },
                                                 {required: true, message: t('enter_AD_NODE')},
                                                 {validator:this.checkNodeName}
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_TMSNodeName'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('CUSTTOM_SYNC_NODE_NAME', {
                                             initialValue:this.state.info.CUSTTOM_SYNC_NODE_NAME,
                                             rules:[
                                                 {max: 64, message:intl.formatMessage({id: 'Max64'}) },
                                                 {required: true, message: t('enter_TMS_NODE')}
                                                 //  {validator:this.checkNodeName}
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_UCNodeName'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('UC_NODE_NAME', {
                                             initialValue:this.state.info.UC_NODE_NAME,
                                             rules:[
                                                 {max: 64, message:intl.formatMessage({id: 'Max64'}) },
                                                 {required: true, message: t('enter_UC_NODE')}
                                                 //  {validator:this.checkNodeName}
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_NTPServer'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('NTP_ADDRESS', {
                                             initialValue:this.state.info.NTP_ADDRESS ? this.state.info.NTP_ADDRESS : '',
                                             rules:[
                                                 {
                                                     validator: (rule, val, callback)=>{validate('ip', rule, val, callback);}
                                                 }
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                     </FormItem>
                                     <Tooltip title="What do you want others to call you?">
                                         <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                     </Tooltip>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_Projectionode'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('PROJECTION_CODE_RANGE', {
                                             initialValue:this.state.info.PROJECTION_CODE_RANGE,
                                             rules:[
                                                 {required: true, message: t('enter_PROJECTION_CODE_NODE')},
                                                 {validator:this.checkProject}
                                             ]
                                         })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                     </FormItem>
                                 </div>
                                 <div className={cssObj.tipOtherDiv}>
                                     <FormItem 
                                         {...formItemLayout}
                                         label={intl.formatMessage({id: 'EUA_AddressBook'})}
                                         colon={false}
                                     >
                                         {getFieldDecorator('accessAuthor', {
                                             initialValue:''
                                         })(<Input  disabled/>)}
                                     </FormItem>
                                     <Tooltip title="What do you want others to call you?">
                                         <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                     </Tooltip>
                                 </div>
                             </div>
                             <div className={cssObj.tipOtherDiv}>
                                 <FormItem
                                     {...formItemLayout}
                                     label=" "
                                     colon={false}
                                 >
                                     <div className={cssObj.btnGroup}>
                                         <Button type="primary" htmlType="submit" style={{marginRight:'19px'}}><FormattedMessage id="Save"/></Button>
                                     </div>
                                 </FormItem>
                             </div>
                         </Form>
                     </div> 
                     
                 </div>  
             );
         }
    }
);
export default injectIntl(OtherSettings);
