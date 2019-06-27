import React, { Component } from "react";
import cssObj from './EmailConfig.css'
import { Form, Table, Checkbox, Button} from 'antd';
const FormItem = Form.Item;
class EmailConfig extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '类型',
          dataIndex: 'type',
        }, {
          title: '内容',
          dataIndex: 'content',
        }];
        this.state = {
          dataSource: [{
            key: '0',
            type: '横幅',
            content: 32,
          }, {
            key: '1',
            type: '横幅',
            content: 42,
          },],
          
        };
      }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
        };
        return <div>
            <div className={cssObj.GroupTitle}>Email配置</div>
            <Form onSubmit={this.handleSubmit} >
            <FormItem
                    {...formItemLayout}
                    label="启用Email通知"
                >
                    {getFieldDecorator('viewMyOwn', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>短信配置</div>
                <FormItem
                    {...formItemLayout}
                    label="启用短信通知"
                >
                    {getFieldDecorator('viewMyOwn', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>短信模板</div>
                <Table  columns={this.columns}  pagination={false} size="small" dataSource={this.state.dataSource}/>
            </Form>
            <div className={cssObj.ConfigOperateDiv}>
                <Button type="primary" size="small" onClick={this.handleSubmit} className={cssObj.saveButton}>
                    保存
                </Button>
                <Button type="primary" size="small" className={cssObj.cancleButton}>
                    取消
                </Button>
            </div>
        </div>
    }
}
EmailConfig = Form.create()(EmailConfig);
export default EmailConfig
