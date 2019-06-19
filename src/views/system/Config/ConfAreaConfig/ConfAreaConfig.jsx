import React, { Component } from "react";
import cssObj from './ConfAreaConfig.css'
import { Button, Select, Form,Table } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const kbitArry = [
    { value: 1, bites: '64 kbit/s' },
    { value: 2, bites: '128 kbit/s' },
    { value: 3, bites: '192 kbit/s' },
    { value: 4, bites: '256 kbit/s' },
    { value: 5, bites: '320 kbit/s' },
    { value: 6, bites: '384 kbit/s' },
    { value: 7, bites: '512 kbit/s' },
    { value: 8, bites: '768 kbit/s' },
    { value: 9, bites: '1024 kbit/s' },
    { value: 10, bites: '1152 kbit/s' },
    { value: 11, bites: '1472 kbit/s' },
    { value: 12, bites: '1536 kbit/s' },
    { value: 13, bites: '1920 kbit/s' },
    { value: 14, bites: '2048 kbit/s' },
    { value: 15, bites: '3Mbit/s' },
    { value: 16, bites: '4Mbit/s' },
    { value: 17, bites: '5Mbit/s' },
    { value: 18, bites: '6Mbit/s' },
    { value: 19, bites: '7Mbit/s' },
    { value: 20, bites: '8Mbit/s' },
]

const CollectionCreateForm = Form.create()(
    class extends React.Component {
      render() {
        const {  form} = this.props;
        const { getFieldDecorator } = form;
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
        return (
          
            <Form>
              <FormItem
                    {...formItemLayout}
                    label="最小速率下限"
                >
                    {getFieldDecorator('floorLevel', {
                        initialValue: 3,
                    })(
                        <Select>
                            {kbitArry.map(item => (
                                <Option key={item.value} value={item.value}>{item.bites}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
            </Form>
      
        );
      }
    }
  );
class ConfAreaConfig extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
            title: '区间',
            dataIndex: 'range',
          }, {
            title: '视频协议',
            dataIndex: 'videoProtocol',
          }, {
            title: '视频格式',
            dataIndex: 'videoResolution',
          },
          {
            title: '音频协议',
            dataIndex: 'audioProtocol',
          },
          {
            title: '阀值',
            dataIndex: 'Threshold',
          },
          {
            title: '最大速率',
            dataIndex: 'highestRate',
          },
          {
            title: '最小速率',
            dataIndex: 'lowestRate',
          },
        ];
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
    render() {

        return <div>
            <div className={cssObj.GroupTitle}>速率设置范围</div>
            <div className={cssObj.GroupContent}>
                <div className={cssObj.right}>
                    <Button className={cssObj.mr}>保存</Button>
                    <Button className={cssObj.mr}>取消</Button>
                </div>
                <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                />
                <Table  columns={this.columns}  pagination={false}/>
            </div>
        </div>
    }
}
export default ConfAreaConfig
