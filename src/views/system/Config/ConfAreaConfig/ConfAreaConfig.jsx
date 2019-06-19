import React, { Component } from "react";
import cssObj from './ConfAreaConfig.css'
import { Button, Select, Form } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const kbitArry = [
    { value: 1, bites: '128 kbit/s' },
    { value: 2, bites: '192 kbit/s' },
    { value: 3, bites: '256 kbit/s' },
    { value: 4, bites: '320 kbit/s' },
    { value: 5, bites: '384 kbit/s' },
    { value: 6, bites: '512 kbit/s' },
    { value: 7, bites: '768 kbit/s' },
    { value: 8, bites: '1152 kbit/s' },
    { value: 9, bites: '1472 kbit/s' },
    { value: 10, bites: '1536 kbit/s' },
    { value: 11, bites: '1920 kbit/s' },

]
const minLimit = Form.create()(
    class extends  React.Component {
        render() {
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
            return <Form>
                <FormItem
                    {...formItemLayout}
                    label="最小速率下限"
                >
                    {getFieldDecorator('ISDNkbit', {
                        initialValue: 6,
                    })(
                        <Select>
                            {kbitArry.map(item => (
                                <Option key={item.value} value={item.value}>{item.bites}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
            </Form>
        }
    }
)
class ConfAreaConfig extends Component {
    render() {

        return <div>
            <div className={cssObj.GroupTitle}>速率设置范围</div>
            <div className={cssObj.GroupContent}>
                <div className={cssObj.right}>
                    <Button className={cssObj.mr}>保存</Button>
                    <Button className={cssObj.mr}>取消</Button>
                </div>
                <minLimit />
            </div>
        </div>
    }
}
export default ConfAreaConfig