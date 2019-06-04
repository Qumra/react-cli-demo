import React, { Component } from "react";
import cssObj from './Conference.css'
import { Form, Input, Col, Select, Checkbox } from 'antd';
import { regExpConfig } from '@/config/Reg.confing'
const FormItem = Form.Item;
const Option = Select.Option;
class Conference extends Component {
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
        return <div className={cssObj.scrollDiv}>
            <div className={cssObj.GroupTitle}>会议参数</div>
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="默认会议名称"
                >
                    {getFieldDecorator('name', {
                        initialValue: 'Conference',
                        rules: [{
                            type: 'name', message: 'The input is not valid name!',
                        }, {
                            required: true, message: 'Please input your name',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="默认会议名称后缀"
                >
                    {getFieldDecorator('namelast', {
                        initialValue: '1',
                    })(
                        <Select>
                        <Option value="1">当前时区格式</Option>
                        <Option value="2">随机数</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="优先启用视频会议类型"
                >
                    {getFieldDecorator('type', {
                        initialValue: '1',
                    })(
                        <Select >
                        <Option value="1">全适配会议</Option>
                        <Option value="2">SVC会议</Option>
                        <Option value="3">全交换会议</Option>

                    </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最大会议时长(分钟)"
                >
                    {getFieldDecorator('maxtime', {
                         initialValue: '1440',
                        rules: [{
                            type: 'maxtime', message: 'The input is not valid maxtime!',
                        }, {
                            required: true, message: 'Please input your maxtime'},
                            // { pattern: regExpConfig.maxtime, message: '360~9999' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最小会议时长(分钟)"
                >
                    {getFieldDecorator('maxtime', {
                         initialValue: '1',
                        rules: [{
                            type: 'mintime', message: 'The input is not valid mintime!',
                        }, {
                            required: true, message: 'Please input your mintime'},
                            // { pattern: regExpConfig.mintime, message: '1~360' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最大延长会议时长(分钟)"
                >
                    {getFieldDecorator('maxtimeLay', {
                         initialValue: '360',
                        rules: [{
                            type: 'maxtimeLay', message: 'The input is not valid maxtimeLay!',
                        }, {
                            required: true, message: 'Please input your maxtimeLay'},
                            // { pattern: regExpConfig.maxtimeLay, message: '360~9999' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最小延长会议时长(分钟)"
                >
                    {getFieldDecorator('maxtimeLay', {
                         initialValue: '10',
                        rules: [{
                            type: 'mintimeLay', message: 'The input is not valid mintimeLay!',
                        }, {
                            required: true, message: 'Please input your mintimeLay'},
                            // { pattern: regExpConfig.mintimeLay, message: '10~360' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启用普通会议自动延长"
                >
                    {getFieldDecorator('autotimeLay', {
                    })(
                        <Checkbox  checked={true}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="会议自动延长最大时长(分钟)"
                >
                    {getFieldDecorator('automaxtimeLay', {
                         initialValue: '60',
                        rules: [{
                            type: 'automaxtimeLay', message: 'The input is not valid automaxtimeLay!',
                        }, {
                            required: true, message: 'Please input your automaxtimeLay'},
                            // { pattern: regExpConfig.automaxtimeLay, message: '60~99999' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="预约会议默认时长(分钟)"
                >
                    {getFieldDecorator('defulttime', {
                         initialValue: '120',
                        rules: [{
                            type: 'defulttime', message: 'The input is not valid defulttime!',
                        }, {
                            required: true, message: 'Please input your defulttime'},
                            // { pattern: regExpConfig.defulttime, message: '20~360' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主叫会场不入会等待时间(分钟)"
                >
                    {getFieldDecorator('ownwaitingtime', {
                         initialValue: '10',
                        rules: [{
                            type: 'ownwaitingtime', message: 'The input is not valid ownwaitingtime!',
                        }, {
                            required: true, message: 'Please input your ownwaitingtime'},
                            // { pattern: regExpConfig.ownwaitingtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所有会场不入会等待时间(分钟)"
                >
                    {getFieldDecorator('allwaitingtime', {
                         initialValue: '1',
                        rules: [{
                            type: 'allwaitingtime', message: 'The input is not valid allwaitingtime!',
                        }, {
                            required: true, message: 'Please input your allwaitingtime'},
                            // { pattern: regExpConfig.allwaitingtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所有会场离会后会议结束时间(分钟)"
                >
                    {getFieldDecorator('endtime', {
                         initialValue: '1',
                        rules: [{
                            type: 'endtime', message: 'The input is not valid endtime!',
                        }, {
                            required: true, message: 'Please input your endtime'},
                            // { pattern: regExpConfig.endtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所有会场离会后会议结束时间(分钟)"
                >
                    {getFieldDecorator('endtime', {
                         initialValue: '1',
                        rules: [{
                            type: 'endtime', message: 'The input is not valid endtime!',
                        }, {
                            required: true, message: 'Please input your endtime'},
                            // { pattern: regExpConfig.endtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启动会议重试次数"
                >
                    {getFieldDecorator('restarttimes', {
                         initialValue: '3',
                        rules: [{
                            type: 'restarttimes', message: 'The input is not valid restarttimes!',
                        }, {
                            required: true, message: 'Please input your restarttimes'},
                            // { pattern: regExpConfig.restarttimes, message: '1~30' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="结束会议重试次数"
                >
                    {getFieldDecorator('endretrytimes', {
                         initialValue: '3',
                        rules: [{
                            type: 'endretrytimes', message: 'The input is not valid endretrytimes!',
                        }, {
                            required: true, message: 'Please input your endretrytimes'},
                            // { pattern: regExpConfig.endretrytimes, message: '1~30' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="会控超时时间(秒)"
                >
                    {getFieldDecorator('timeout', {
                         initialValue: '35',
                        rules: [{
                            type: 'timeout ', message: 'The input is not valid timeout !',
                        }, {
                            required: true, message: 'Please input your timeout '},
                            // { pattern: regExpConfig.timeout , message: '5~120' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="单个会议最大会场个数"
                    help="Should be 128~3000 "
                >
                    {getFieldDecorator('maxmeeting', {
                         initialValue: '2000',
                        rules: [{
                            type: 'maxmeeting ', message: 'The input is not valid maxmeeting !',
                        }, {
                            required: true, message: 'Please input your maxmeeting '},
                            // { pattern: regExpConfig.maxmeeting , message: '128~3000' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="多级子会议最大个数"
                    help="Should be 2~40"
                >
                    {getFieldDecorator('sub-conferencesmax', {
                         initialValue: '2000',
                        rules: [{
                            type: 'maxmeeting ', message: 'The input is not valid maxmeeting !',
                        }, {
                            required: true, message: 'Please input your maxmeeting '},
                            // { pattern: regExpConfig.maxmeeting , message: '128~3000' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        </div>
    }
}
Conference = Form.create()(Conference);
export default Conference
