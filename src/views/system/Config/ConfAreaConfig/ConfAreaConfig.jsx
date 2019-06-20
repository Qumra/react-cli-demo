import React, { Component } from "react";
import cssObj from './ConfAreaConfig.css'
import { Button, Select, Form,Table,Input,Menu,Dropdown,Icon } from 'antd';
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
];
const videoProtocolArry = [
    { value: 1, bites: 'H.263' },
    { value: 2, bites: 'H.264' },
    { value: 3, bites: 'H.264HP' },
    { value: 4, bites: 'H.265' },
];
const resolutionArry =[
    { value: 1, bites: 'QCIF' },
    { value: 2, bites: 'CIF' },
    { value: 3, bites: '360p' },
    { value: 4, bites: 'VAG' },
    { value: 5, bites: '4CIF' },
    { value: 6, bites: '16CIF' },
    { value: 7, bites: '480i' },
    { value: 8, bites: '480p' },
    { value: 9, bites: '720p' },
    { value: 10, bites: '720p60' },
    { value: 11, bites: '1080i' },
    { value: 12, bites: '1080p' },
    { value: 13, bites: '1080p60' },
]
const audioProtocolArry = [
    { value: 1, bites: 'G.719' },
    { value: 2, bites: 'G.728' },
    { value: 3, bites: 'G.729' },
    { value: 4, bites: 'G.711A' },
    { value: 5, bites: 'G.711U' },
    { value: 6, bites: 'G.722.1C_32K' },
    { value: 7, bites: 'G.722.1C_24K' },
    { value: 8, bites: 'G.722.1C_48K' },
    { value: 9, bites: 'G.722_48K' },
    { value: 10, bites: 'G.722_56K' },
    { value: 11, bites: 'G.722_64K' },
    { value: 12, bites: 'iLBC' },
    { value: 13, bites: 'AAC-LD 单声道' },
    { value: 14, bites: 'AAC-LC 单声道' },
    { value: 15, bites: 'HWA-LD 单声道' },
    { value: 16, bites: 'AAC-LD 双声道' },
    { value: 17, bites: 'AAC-LC 双声道' },
    { value: 18, bites: 'HWA-LD 双声道' },
    { value: 19, bites: 'AAC-LD 三声道' },
    { value: 20, bites: 'opus' },
    
]
const RateCreateForm = Form.create()(
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
  const SubConfArea = Form.create()(
    class extends React.Component {
      render() {
        const {  form,onBlur} = this.props;
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
                    label="子会议区间个数"
                >
                    {getFieldDecorator('SubConfArea', {
                        initialValue: 0,
                        normalize: (e) => e ? parseInt(e) : '',
                            rules: [{
                                type: 'number', min: 1, max: 50, message: 'must be 1~50'
                            }, {
                                required: true, message: 'Please input your SubConfArea '
                            },
                                // { pattern: regExpConfig.SVC , message: ' 1~49 }
                            ],
                    })(
                        <Input onBlur={onBlur} />
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
        this.columns1 = [{
            title: '区间',
            dataIndex: 'range',
          }, {
            title: '视频协议',
            dataIndex: 'videoProtocol',
            render: text => {
                return <Select defaultValue= {2} size="large">
                {videoProtocolArry.map(item => (
                    <Option key={item.value} value={item.value}>{item.bites}</Option>
                ))}
            </Select>
            }
          }, {
            title: '视频格式',
            dataIndex: 'videoResolution',
            render: text => {
                return <Select defaultValue= {1} size="large">
                {resolutionArry.map(item => (
                    <Option key={item.value} value={item.value}>{item.bites}</Option>
                ))}
            </Select>
            }
          },
          {
            title: '音频协议',
            dataIndex: 'audioProtocol',
            render: text => {
                return <Select defaultValue= {13} size="large">
                {audioProtocolArry.map(item => (
                    <Option key={item.value} value={item.value}>{item.bites}</Option>
                ))}
            </Select>
            }
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
            render:text=>{
                return  <Select defaultValue= {16} size="large">
                {kbitArry.map(item => (
                    <Option key={item.value} value={item.value}>{item.bites}</Option>
                ))}
            </Select>
            }
          },
        ];
        this.columns2 = [
        {
            title: '序号',
            dataIndex: 'number',
        },
        {
            title: '最小值',
            dataIndex: 'min',
        },
        {
            title: '最大值',
            dataIndex: 'max',
        }
        
    ,]
        this.state={
            data1:[
                {key: '0',range:'1',videoProtocol:'H.264',videoResolution:'1080p',audioProtocol:'AAC-LD 单声道',Threshold:'1',highestRate:'7680',lowestRate:'4 Mbit/s'}
            ],
            data2:[
             
            ]
        }

            
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      handleBlur=()=>{
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('Received values of form: ', values);
        const  data2  = []
        for(let i=0;i<values.SubConfArea;i++){
            let newData = {key:i+1,number:i+1,min:0,max:0}
            data2.push(newData)
        }
        this.setState({
            data2:data2
        })
    })
      }
    render() {

        return <div>
            <div className={cssObj.GroupTitle}>速率设置范围</div>
            <div className={cssObj.GroupContent}>
                <div className={cssObj.right}>
                    <Button className={cssObj.mr}>保存</Button>
                    <Button className={cssObj.mr}>取消</Button>
                </div>
                <RateCreateForm
                />
                <Table  columns={this.columns1}  pagination={false} size="small" dataSource={this.state.data1}/>
            </div>
            <div className={cssObj.GroupTitle}>子会议区间设置</div>
            <div className={cssObj.GroupContent}>
            <div className={cssObj.right}>
                    <Button className={cssObj.mr}>保存</Button>
                    <Button className={cssObj.mr}>取消</Button>
                </div>
            <SubConfArea 
            wrappedComponentRef={this.saveFormRef}
            onBlur={this.handleBlur}
            />
            <Table  columns={this.columns2}  pagination={false} size="small" dataSource={this.state.data2}/>
            </div>
        </div>
    }
}
export default ConfAreaConfig
