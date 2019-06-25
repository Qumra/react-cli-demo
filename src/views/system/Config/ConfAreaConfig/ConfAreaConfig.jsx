import React, { Component } from "react";
import cssObj from './NlogV2Config.css'
import { Form, Input, Select, Button, Icon, Menu } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const rateArry = [
    { value: 1, bites: '1秒/点' },
    { value: 2, bites: '2秒/点' },
    { value: 3, bites: '5秒/点' },
    { value: 4, bites: '10秒/点' },
    { value: 5, bites: '15秒/点' },
    { value: 6, bites: '30秒/点' },
    { value: 7, bites: '1分钟/点' },
    { value: 8, bites: '1分钟/点' },
]
// const DoubleInput =
class NlogV2Config extends Component {
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
        const pformItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Input style={{ width: 90 }} />
          );
        return <div>
                <div className={cssObj.GroupTitle}>文件配置</div>
                <Form onSubmit={this.handleSubmit} >
                <FormItem
                    {...formItemLayout}
                    label="最旧会议时间(天)"
                >
                    {getFieldDecorator('daysHistory', {
                        initialValue: 10,
                        normalize: (e) => e ? parseInt(e) : '',
                            rules: [{
                                type: 'number', min: 1, max: 366, message: 'must be 1~366'
                            }, {
                                required: true, message: 'Please input your daysHistory '
                            },
                                // { pattern: regExpConfig.SVC , message: ' 1~49 }
                            ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>采样率</div>
                <FormItem
                        {...formItemLayout}
                        label="缩略图采样率"
                    >
                        {getFieldDecorator('thumbnailSamplingRate', {
                            initialValue: 6,
                        })(
                            <Select>
                                {rateArry.map(item => (
                                    <Option key={item.value} value={item.value}>{item.bites}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>告警门限</div>
                    
                    <FormItem
                    {...pformItemLayout}
                    label="视频发送方向门限(%)"
                >
                    {getFieldDecorator('video', {
                        initialValue: 10,
                        normalize: (e) => e ? parseInt(e) : '',
                            rules: [{
                                type: 'number', min: 1, max: 366, message: 'must be 1~366'
                            }, {
                                required: true, message: 'Please input your daysHistory '
                            },
                                // { pattern: regExpConfig.SVC , message: ' 1~49 }
                            ],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '50%', marginLeft: '3%' }}/>
                    )}
                     
                </FormItem>
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
NlogV2Config = Form.create()(NlogV2Config);
export default NlogV2Config
