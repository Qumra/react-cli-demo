import React, { Component } from "react";
import cssObj from './Conference.css'
import { Form, Input, Slider, Select, Checkbox, Button, Icon, Tooltip, Upload,Modal } from 'antd';
import { regExpConfig } from '@/config/Reg.confing'
import intl, { SUPPOER_LOCALES } from '@/config/i18n'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const marks = {
    0: '不灵敏',
    100: {
        style: {
            color: '#f50',
        },
        label: '灵敏',
    },
}
// ISDN会场最大带宽
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
class Conference extends Component {
// checkout
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
// 表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    // 上传文件
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }
    
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
        return <div>
            <div className={cssObj.scrollDiv}>
                <div className={cssObj.GroupTitle}>会议参数</div>
                <Form onSubmit={this.handleSubmit}>
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
                                type: 'number', message: 'The input is not valid maxtime!',
                            }, {
                                required: true, message: 'Please input your maxtime'
                            },
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
                        {getFieldDecorator('mintime', {
                            initialValue: '1',
                            rules: [{
                                type: 'number', message: 'The input is not valid mintime!',
                            }, {
                                required: true, message: 'Please input your mintime'
                            },
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
                                type: 'number', message: 'The input is not valid maxtimeLay!',
                            }, {
                                required: true, message: 'Please input your maxtimeLay'
                            },
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
                                type: 'number', message: 'The input is not valid mintimeLay!',
                            }, {
                                required: true, message: 'Please input your mintimeLay'
                            },
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
                            <Checkbox checked={true} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="会议自动延长最大时长(分钟)"
                    >
                        {getFieldDecorator('automaxtimeLay', {
                            initialValue: '60',
                            rules: [{
                                type: 'number', message: 'The input is not valid automaxtimeLay!',
                            }, {
                                required: true, message: 'Please input your automaxtimeLay'
                            },
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
                                type: 'number', message: 'The input is not valid defulttime!',
                            }, {
                                required: true, message: 'Please input your defulttime'
                            },
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
                                type: 'number', message: 'The input is not valid ownwaitingtime!',
                            }, {
                                required: true, message: 'Please input your ownwaitingtime'
                            },
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
                                type: 'number', message: 'The input is not valid allwaitingtime!',
                            }, {
                                required: true, message: 'Please input your allwaitingtime'
                            },
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
                                type: 'number', message: 'The input is not valid endtime!',
                            }, {
                                required: true, message: 'Please input your endtime'
                            },
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
                                type: 'number', message: 'The input is not valid restarttimes!',
                            }, {
                                required: true, message: 'Please input your restarttimes'
                            },
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
                                type: 'number', message: 'The input is not valid endretrytimes!',
                            }, {
                                required: true, message: 'Please input your endretrytimes'
                            },
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
                                type: 'number ', message: 'The input is not valid timeout !',
                            }, {
                                required: true, message: 'Please input your timeout '
                            },
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
                                type: 'number ', message: 'The input is not valid maxmeeting !',
                            }, {
                                required: true, message: 'Please input your maxmeeting '
                            },
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
                        {getFieldDecorator('subConferencesmax', {
                            initialValue: '40',
                            rules: [{
                                type: 'number ', message: 'The input is not valid subConferencesmax !',
                            }, {
                                required: true, message: 'Please input your subConferencesmax '
                            },
                                // { pattern: regExpConfig.subConferencesmax , message: '2~40' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="单个周期会议的最大会议数"
                    // help="Should be 1~100"
                    >
                        {getFieldDecorator('signleConferencesmax', {
                            initialValue: '30',
                            rules: [{
                                type: 'string', whitespace: true, message: 'The input is not valid conferencesmax !',
                            }, {
                                required: true, message: 'Please input your conferencesmax '
                            },
                            { pattern: regExpConfig.signleConferencesmax, message: ' 请输入1~100' }
                            ],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\D/g, '')
                            },
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="持续呼叫时间(分钟)"
                        help="Should be 1~120"
                    >
                        {getFieldDecorator('lasttime', {
                            initialValue: '5',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid lasttime !',
                            }, {
                                required: true, message: 'Please input your lasttime '
                            },
                                // { pattern: regExpConfig.lasttime , message: ' 1~100' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="呼叫间隔(秒)"
                        help="Should be 2~1000"
                    >
                        {getFieldDecorator('spacetime', {
                            initialValue: '30',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid ConferenceSwitch !',
                            }, {
                                required: true, message: 'Please input your ConferenceSwitch '
                            },
                                // { pattern: regExpConfig.ConferenceSwitch , message: ' 15~50' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="默认匿名级联通道数"
                        help="Should be 0~32"
                    >
                        {getFieldDecorator('Defaultchannels', {
                            initialValue: '0',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid spacetime !',
                            }, {
                                required: true, message: 'Please input your spacetime '
                            },
                                // { pattern: regExpConfig.spacetime , message: ' 15~50' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主叫呼集加密类型"
                    >
                        {getFieldDecorator('SiteCall encryption', {
                            initialValue: '1',
                        })(
                            <Select>
                                <Option value="1">强制加密</Option>
                                <Option value="2">自动加密</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主叫呼集默认语言"
                    >
                        {getFieldDecorator('Default language', {
                            initialValue: 'en-US',
                        })(
                            <Select>
                                {SUPPOER_LOCALES.map(locale => (
                                    <Option key={locale.value} value={locale.value}>{locale.name}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="锁定会议演示"
                    >
                        {getFieldDecorator('lockConference', {
                        })(
                            <Checkbox checked={false} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="TP会场观看远端默认在"
                    >
                        {getFieldDecorator('screenSelect', {
                            initialValue: '3',
                        })(
                            <Select>
                                <Option value="1">左屏</Option>
                                <Option value="2">主屏</Option>
                                <Option value="3">右屏</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="禁止离线重呼规则"
                        help="只允许输入数字、字母、“：”、“.”、“@”、“*”，并以英文“，”隔开"
                    >
                        {getFieldDecorator('recallProhibition', {
                            initialValue: '8*,4*,',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid recall prohibition !',
                            }, {
                                required: true, message: 'Please input your recall prohibition '
                            },
                                // { pattern: regExpConfig.recall prohibition , message: ' 15~50' }
                            ],
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="声控切换阈值"
                    >{getFieldDecorator('vioce', {
                        initialValue: 37,
                        rules: [{ type: 'number', }]
                    })(
                        <Slider marks={marks} />
                    )}
                    </FormItem>
                    <FormItem style={{ marginLeft: '10px' }}
                        {...formItemLayout}
                        label="超过声控切换与会方阈值,关闭声控切换"
                    >
                        {getFieldDecorator('vioceSwitch', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="声控切换与会方阈值"
                    >
                        {getFieldDecorator('ConferenceSwitch', {
                            initialValue: '30',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid ConferenceSwitch !',
                            }, {
                                required: true, message: 'Please input your ConferenceSwitch '
                            },
                                // { pattern: regExpConfig.ConferenceSwitch , message: ' 15~50' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    {/* xwx683487 */}
                    <FormItem style={{ marginLeft: '10px' }}
                        {...formItemLayout}
                        label="允许终端创建会议"
                    >
                        {getFieldDecorator('createConference', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="强制使用计费码"
                    >
                        {getFieldDecorator('costCode', {
                            valuePropName: 'checked',
                            initialValue: false
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="采用CT适配模式"
                    >
                        {getFieldDecorator('CTMode', {
                            valuePropName: 'checked',
                            initialValue: false
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用级联备份"
                    >
                        {getFieldDecorator('backUp', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用动态迁移"
                    >
                        {getFieldDecorator('migration', {
                            valuePropName: 'checked',
                            initialValue: false
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用系统消息"
                    >
                        {getFieldDecorator('systemMessage', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="允许会场名称重复"
                    >
                        {getFieldDecorator('participantNames', {
                            valuePropName: 'checked',
                            initialValue: false
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="支持服务区内部级联"
                    >
                        {getFieldDecorator('supportCascading', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="MCU级联个数"
                    >
                        {getFieldDecorator('MCU', {
                            initialValue: '2',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid MCU !',
                            }, {
                                required: true, message: 'Please input your MCU '
                            },
                                // { pattern: regExpConfig.MCU , message: ' 2~100' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="音频自适应"
                    >
                        {getFieldDecorator('audioAdaptation', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="动态会场离会保留时间(秒)"
                    >
                        {getFieldDecorator('staytime', {
                            initialValue: '120',
                            rules: [{
                                type: 'number', whitespace: true, message: 'The input is not valid staytime !',
                            }, {
                                required: true, message: 'Please input your staytime '
                            },
                                // { pattern: regExpConfig.staytime , message: ' 0~36000' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="预定义会场名优先"
                    >
                        {getFieldDecorator('predefinedName', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="外邀匿名会场转成纯语音"
                    >
                        {getFieldDecorator('ConvertAudio', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="支持MCU资源池备份"
                    >
                        {getFieldDecorator('MCUBackup', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用SIP弹性通道"
                    >
                        {getFieldDecorator('SIP', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="SVC通道会场数"
                    >
                        {getFieldDecorator('SVC', {
                            initialValue: 16,
                            normalize: (e) => e ? parseInt(e) : '',
                            rules: [{
                                type: 'number', min: 1, max: 49, message: 'must be 15~50'
                            }, {
                                required: true, message: 'Please input your SVC '
                            },
                                // { pattern: regExpConfig.SVC , message: ' 1~49 }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="默认媒体加密类型"
                    >
                        {getFieldDecorator('encryptionType', {
                            initialValue: '1',
                        })(
                            <Select>
                                <Option value="1">自动加密</Option>
                                <Option value="2">强制加密</Option>
                                <Option value="3">不加密</Option>
                            </Select>
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>录播参数</div>
                    <FormItem
                        {...formItemLayout}
                        label="统一录播号"
                    >
                        {getFieldDecorator(' recordingNumber', {
                            initialValue: '9900',
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your recordingNumber '
                            },
                                // { pattern: regExpConfig.SVC , message: ' 1~49 }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="单点录制时长(分钟)"
                    >
                        {getFieldDecorator('recordingDuration', {
                            initialValue: '120',
                            rules: [{
                                type: 'number', min: 20, max: 99999, message: 'must be 20~99999'
                            }, {
                                required: true, message: 'Please input your recordingDuration '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否支持单点自动录制"
                    >
                        {getFieldDecorator('AutoRecord', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用SMC录播跳转功能"
                    >
                        {getFieldDecorator('SMC', {
                            valuePropName: 'checked',
                            initialValue: false
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用永久会议所有会场离会自动停止录播"
                    >
                        {getFieldDecorator('automaticallyStop', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="等待时长(分钟)"
                    >
                        {getFieldDecorator('waitingTime', {
                            initialValue: '10',
                            rules: [{
                                type: 'number', min: 1, max: 49, message: 'must be 1~49'
                            }, {
                                required: true, message: 'Please input your waitingTime '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>接入号</div>
                    <FormItem
                        {...formItemLayout}
                        label="最小子会议号"
                    >
                        {getFieldDecorator('maxnumberID', {
                            initialValue: '10000',
                            rules: [{
                                type: 'number', min: 1, max: 999999998, message: 'must be 1~999999998'
                            }, {
                                required: true, message: 'Please input your maxnumberID '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="最大子会议号"
                    >
                        {getFieldDecorator('minnumberID', {
                            initialValue: '99999',
                            rules: [{
                                type: 'number', min: 2, max: 999999999, message: 'must be 2~999999999'
                            }, {
                                required: true, message: 'Please input your minnumberID '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="统一接入号"
                    >
                        {getFieldDecorator('unifiedAccess', {
                            initialValue: '9002',
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your unifiedAccess '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="接入MCU"
                    >
                        {getFieldDecorator('accessMCU', {
                            initialValue: '1',
                        })(
                            <Select>
                                <Option value="1">None</Option>
                                <Option value="2">128.105.166.23</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="预留端口数"
                    >
                        {getFieldDecorator('reservablePorts', {
                            initialValue: '1',
                            rules: [{
                                type: 'number', min: 1, max: 152, message: 'must be 1~152'
                            }, {
                                required: true, message: 'Please input your reservablePorts '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="会议特服号"
                    >
                        {getFieldDecorator('serviceNumber', {
                            initialValue: '168',
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your serviceNumber '
                            },
                            { pattern: '', message: '只能是数字，少于12位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="CTS接入前缀"
                    >
                        {getFieldDecorator('CTS', {
                            initialValue: '9002',
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your CTS '
                            },
                            { pattern: '', message: '只能是数字，少于12位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="允许未定义终端创建会议"
                    >
                        {getFieldDecorator('allowUndefinedCreateConference', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="允许未定义终端加入会议"
                    >
                        {getFieldDecorator('allowUndefinedJoinConference', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="两点变多点接入号"
                    >
                        {getFieldDecorator('Point-to-point ID', {
                            initialValue: '8008',
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your Point-to-point ID '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>前缀</div>
                    <FormItem
                        {...formItemLayout}
                        label="IP-ISDN点对点呼叫前缀"
                    >
                        {getFieldDecorator('IP-ISDN', {
                            initialValue: '8600',
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your IP-ISDN '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="ISDN会场最大带宽"
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
                    <div className={cssObj.GroupTitle}>融合会议参数</div>
                    <FormItem
                        {...formItemLayout}
                        label="融合会议组网"
                    >
                        {getFieldDecorator('convergentConference', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开启SMC2.0融合会议能力"
                    >
                        {getFieldDecorator('SMC2.0Capability', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用passcode"
                    >
                        {getFieldDecorator('passcode', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Passcode前缀"
                    >
                        {getFieldDecorator('"PasscodePrefix', {
                            initialValue: 1,
                            rules: [{
                                type: 'number', min: 1, max: 99, message: 'must be 1~99'
                            }, {
                                required: true, message: 'Please input your PasscodePrefix '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Web会场前缀"
                    >
                        {getFieldDecorator('WebPrefix', {
                            initialValue: 9800,
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your WebPrefix '
                            },
                            { pattern: '', message: '只能是数字，4~32位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Web虚拟通道前缀"
                    >
                        {getFieldDecorator('WebVirtualPrefix', {
                            initialValue: 9600,
                            rules: [{
                                type: 'number',
                            }, {
                                required: true, message: 'Please input your WebVirtualPrefix '
                            },
                            { pattern: '', message: '只能是数字，4~32位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>CloudLink参数</div>
                    <FormItem
                        {...formItemLayout}
                        label="启用CloudLink会议链接入会"
                    >
                        {getFieldDecorator('CloudLink', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox />
                        )}
                        <Tooltip title="启用CloudLink会议链接入会,需要先开启融合会议组网配置项">
                            <Icon type="info-circle" />
                        </Tooltip>
                    </FormItem>
                    <div className={cssObj.GroupTitle}>Web入会参数</div>
                    <FormItem
                        {...formItemLayout}
                        label="链接入会接入地址"
                    >
                        {getFieldDecorator('linkAccessAddress', {
                            initialValue: '128.105.66.23',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your linkAccessAddress '
                            },
                            { pattern: '', message: '' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>数据会议参数</div>
                    <FormItem
                        {...formItemLayout}
                        label="终端召集时启用数据会议"
                    >
                        {getFieldDecorator('dataConference', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据会议客户端下载地址"
                    >
                        {getFieldDecorator('clientDownloadURL', {
                            initialValue: '128.105.66.23',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your clientDownloadURL '
                            },
                            { pattern: '', message: '' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据会议客户端上传"
                    >
                        {getFieldDecorator('uploadTE', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button>
                                    <Icon type="upload" /> 上传
              </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据会议默认分辨率"
                    >
                        {getFieldDecorator('defaultResolution', {
                            initialValue: '1',
                        })(
                            <Select>
                                <Option  value='1'>4k*2k</Option>
                                <Option  value='2'>1080</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="启用高清实时数据会议"
                    >
                        {getFieldDecorator('HDrealTime', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>WebRTC参数</div>
                    <FormItem
                        {...formItemLayout}
                        label="启用WebRTC"
                    >
                        {getFieldDecorator('WebRTC', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>会场提示信息</div>
                    <FormItem
                        {...formItemLayout}
                        label="开启点名提示音"
                    >
                        {getFieldDecorator('enableAnnouncement', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="会场点名提示"
                    >
                        {getFieldDecorator('givenFloor', {
                            initialValue: '',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your givenFloor '
                            },
                            { pattern: '', message: '最大长度64位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="点名前提示"
                    >
                        {getFieldDecorator('aboutGivenFloor', {
                            initialValue: '开始点名',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your WebVirtualPrefix '
                            },
                            { pattern: '', message: '最大长度64位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广播会场提示"
                    >
                        {getFieldDecorator('Broadcast', {
                            initialValue: '',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your Broadcast '
                            },
                            { pattern: '', message: '最大长度64位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="被主席观看提示"
                    >
                        {getFieldDecorator('ViewedByChair', {
                            initialValue: '',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your ViewedByChair '
                            },
                            { pattern: '', message: '最大长度64位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主席轮询会场被观看前提示"
                    >
                        {getFieldDecorator('broadcastInTurn', {
                            initialValue: '',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your broadcastInTurn '
                            },
                            { pattern: '', message: '最大长度64位' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="会场入会"
                    >
                        {getFieldDecorator('joinConference:', {
                            initialValue: '',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your joinConference '
                            },
                            { pattern: '', message: '示例：%s会场已加入会议。  实际显示的会场入会提示信息，将会以入会的会场名称自动填充“%s”字段。' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="会场离会"
                    >
                        {getFieldDecorator('exitConference', {
                            initialValue: '',
                            rules: [{
                                type: 'string',
                            }, {
                                required: true, message: 'Please input your exitConference '
                            },
                            { pattern: '', message: '示例：%s会场已离开会议。  实际显示的会场离会提示信息，将会以离会的会场名称自动填充“%s”字段。' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="提示显示时长(秒)"
                    >
                        {getFieldDecorator(' displayDuration', {
                            initialValue: 15,
                            rules: [{
                                type: 'number', min: 5, max: 60, message: 'must be 5~60'
                            }, {
                                required: true, message: 'Please input your PasscodePrefix '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>会场分区阈值</div>
                    <FormItem
                        {...formItemLayout}
                        label="ISDN会场分区阈值"
                    >
                        {getFieldDecorator(' ISDNthreshold', {
                            initialValue: 1,
                            rules: [{
                                type: 'number', min: 1, max: 999, message: 'must be 1~999'
                            }, {
                                required: true, message: 'Please input your ISDNthreshold '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="IP会场分区阈值"
                    >
                        {getFieldDecorator(' IPthreshold', {
                            initialValue: 1,
                            rules: [{
                                type: 'number', min: 1, max: 999, message: 'must be 1~999'
                            }, {
                                required: true, message: 'Please input your IPthreshold '
                            },
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>文本模板管理</div>
                        
                </Form>
            </div>
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
Conference = Form.create()(Conference);
export default Conference
