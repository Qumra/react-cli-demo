// 共享组织
import React, { Component } from 'react';
import {Form, Switch, Button, Tree } from 'antd';
import cssObj from './EUADetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const {TreeNode} = Tree;
const ShareNode = Form.create()(
    class  extends Component {
        constructor() {
            super();
            setLocale('zh-CN', zh_CN_Device);
            setLocale('en-US', en_US_Device);
            this.state = {
                data:[
                    {orgName:'一级名称', orgId:'0-0', children:[
                        {orgName:'二级名称', orgId:'0-0-0', children:[
                            {orgName:'三级名称', orgId:'0-0-0-0'},
                            {orgName:'三级名称', orgId:'0-0-0-1'},
                            {orgName:'三级名称', orgId:'0-0-0-2'},
                            {orgName:'三级名称', orgId:'0-0-0-3'}
                        ]}
                    ]},
                    {orgName:'一级名称', orgId:'0-1', children:[
                        {orgName:'二级名称', orgId:'0-0-0', children:[
                            {orgName:'三级名称', orgId:'0-0-0-0'},
                            {orgName:'三级名称', orgId:'0-0-0-1'}
                        ]},
                        {orgName:'二级名称', orgId:'0-0-1', children:[
                            {orgName:'三级名称', orgId:'0-0-1-0'},
                            {orgName:'三级名称', orgId:'0-0-1-1'}
                        ]}
                    ]}
                ]
            };
        }
        onChange=(checked)=>{
            console.log(checked);
        };
        /*
  * 动态构建机构树形菜单
  * */
  renderTree = (data, idx) =>{
      console.log('树形菜单数据源', data);
      return data.map(item => {
          if (!item.children) {
              return (
                  <TreeNode title={item.orgName} key={item.orgId} />
              );
          } else {
              return (
                  <TreeNode title={item.orgName} key={item.orgId}>
                      {this.renderTree(item.children)}
                  </TreeNode>
              );
          }
      });

  };
  render() {
      const { getFieldDecorator } = this.props.form; 
      const { intl } = this.props;
      return (
          <div className={cssObj.shareNode}>
              <Form>
                  <div className={cssObj.formHeader}>
                      <FormItem 
                          label={intl.formatMessage({id: 'EUA_RestrictQuery'})}
                          colon={false}
                      >
                          {getFieldDecorator('limitSearch', {
                          })(
                              <Switch  onChange={this.onChange} defaultChecked/>
                          )}
                                
                      </FormItem>
                      <span><FormattedMessage id="EUA_RestrictQueryTip"/></span>
                  </div>
                  <div className={cssObj.formBody}>
                      <Tree
                          checkable
                          showLine
                          defaultExpandedKeys={['0-0', '0-0-0', '0-0-1', '0-1-0', '0-1-1']}
                          defaultSelectedKeys={['0-0-0', '0-0-1']}
                          defaultCheckedKeys={['0-0-0', '0-0-1']}
                          onSelect={this.onSelect}
                          onCheck={this.onCheck}
                      >{this.renderTree(this.state.data)}
                      </Tree>
                  </div>
                  <div className={cssObj.formFooter}>
                      <div className={cssObj.btnGroup}>
                          <Button type="primary" className={cssObj.saveBtn}><FormattedMessage id="Save"/></Button>
                          <Button><FormattedMessage id="Cancel"/></Button>
                      </div>
                  </div>
              </Form>
          </div>
      );
  }
    }
);

export default injectIntl(ShareNode);
