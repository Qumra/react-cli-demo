// 共享组织
import React, { Component } from 'react';
import {Form, Switch, Button, Tree } from 'antd';
import cssObj from './EUADetail.css';
const FormItem = Form.Item;
const {TreeNode} = Tree;
const ShareNode = Form.create()(
    class  extends Component {
        onChange=(checked)=>{
            console.log(checked);
        };
        render() {
            const { getFieldDecorator } = this.props.form; 
            return (
                <div className={cssObj.shareNode}>
                    <Form>
                        <div className={cssObj.formHeader}>
                            <FormItem 
                                label="限制用户查询组织"
                                colon={false}
                            >
                                {getFieldDecorator('limitSearch', {
                                })(
                                    <Switch  onChange={this.onChange} defaultChecked/>
                                )}
                                
                            </FormItem>
                            <span>选择组织后，用户将无法从通讯录看到此组织</span>
                        </div>
                        <div className={cssObj.formBody}>
                            <Tree
                                checkable
                                showLine
                                defaultExpandedKeys={['0-0-0', '0-0-1', '0-1-0', '0-1-1']}
                                defaultSelectedKeys={['0-0-0', '0-0-1']}
                                defaultCheckedKeys={['0-0-0', '0-0-1', '0-1-0', '0-1-1']}
                                onSelect={this.onSelect}
                                onCheck={this.onCheck}
                            >
                                <TreeNode title="一级名称" key="0-0">
                                    <TreeNode title="二级名称" key="0-0-0" >
                                        <TreeNode title="三级名称" key="0-0-0-0"  />
                                        <TreeNode title="三级名称" key="0-0-0-1" />
                                        <TreeNode title="三级名称" key="0-0-0-2"  />
                                        <TreeNode title="三级名称" key="0-0-0-3" />
                                    </TreeNode>
                                    <TreeNode title="二级名称" key="0-0-1">
                                        <TreeNode title="三级名称" key="0-0-1-0" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode title="一级名称" key="0-1">
                                    <TreeNode title="二级名称" key="0-1-0" >
                                        <TreeNode title="三级名称" key="0-1-0-0"  />
                                        <TreeNode title="三级名称" key="0-1-0-1" />
                                    </TreeNode>
                                    <TreeNode title="二级名称" key="0-1-1">
                                        <TreeNode title="三级名称" key="0-1-1-0" />
                                    </TreeNode>
                                </TreeNode>
                            </Tree>
                        </div>
                        <div className={cssObj.formFooter}>
                            <div className={cssObj.btnGroup}>
                                <Button type="primary" className={cssObj.saveBtn}>保存</Button>
                                <Button>取消</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            );
        }
    }
);

export default ShareNode;
