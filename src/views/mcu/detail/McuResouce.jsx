import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { Radio, DatePicker } from 'antd';
import cssObj from './McuResouce.css';
import { zh_CN_Device } from '@/locale/zh_CN';
import { en_US_Device } from '@/locale/en_US';
import { setLocale, t } from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
function range(start, end, unit) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i + unit);
    }
    return result;
}
function mock(count) {
    let result = [];
    let time = new Date('2019-10-16 09:25:00.0');
    for (let i = 0; i < count; i++) {
        result.push({
            'videoResourceUsage': Math.random(), 'audioResourceUsage': Math.random(), 'time':(new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes() + i * 15).toUTCString())
        });


    }
    return result;
}

function toLocal(data) {
    for(let i = 0; i < data.length; i++) {
        // data[i]['time'] = new Date(data[i]['time'] + 'GMT');
        data[i]['time'] = moment.utc(data[i]['time']).toDate();
    }
    return data;
}


class McuResouce extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
            id:props.location.state ? props.location.state.id  : '',
            xType: 'days',
            datas:[],
            emptyData:false,
            hasData:false
        };
    }

    componentWillMount() {//渲染前调用
        this.getMcuResource('SORT_BY_DAY');
    }
    getMcuResource = (type) => {
        console.log(type);
        let statusCodeSuccess = 200;
        // let dataCnt = 192;
        // this.setState({
        //     datas : toLocal(Body),
        //     hasData:true
        // });
        let resouceCallback = res => {
            console.log(res);
            if(res.data === '') {
                this.setState({
                    emptyData:true
                });
            }
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
                this.setState({
                    emptyData:true,
                    hasData:true
                });
            } else {
                console.log('请求成功');
                console.log(res.data);
                this.setState({
                    datas: toLocal(res.data),
                    hasData:true
                });
            }
        };
        let data = { id:this.state.id, sortType: type };
        console.log(data);
        csm.registOpCallback('queryResource', resouceCallback);
        csm.queryResource(data);

    }
    getOptionVideo() {
        let time = new Date();
        console.log(this.state.datas);
        const option = {
            title: {
                text: '视频资源利用率'
            },
            lineStyle: {
                normal: {
                    // color: '#0D94FF',
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#0D94FF' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#68BCFF' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 4
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let date = new Date(params[0].value[0]);
                    let data = date.getFullYear() + '-'
                        + (date.getMonth() + 1) + '-'
                        + date.getDate() + ' '
                        + date.getHours() + ':'
                        + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
                    return '利用率：' +  params[0].value[1] + '% <br/> 日期：' + data;
                },
                textStyle:{color:'#333'},
                backgroundColor:'rgba(255,255,255,1)',
                axisPointer:{
                    type:'line',
                    axis:'x'
                }
            },
            dataZoom: [{
                startValue:this.state.datas ? new Date(this.state.datas[0]['time']) : ''
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                show:false,
                pieces: [{
                    gt: 80,
                    lte: 100,
                    // color: '#FA7A4D'
                    color: '#0D94FF'
                }],
                outOfRange: {
                    color: '#0D94FF'
                }
            },
            xAxis: [
                {
                    type: 'time',
                    splitNumber: 20,
                    interval:3600 * 4 * 1000,
                    splitLine: {
                        show: false
                    }
                }],
            yAxis: [{
                type: 'value',
                scale: true,
                max: 100,
                min: 0,
                splitNumber: 5,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            }],
            series: [
                {
                    name: '利用率',
                    type: 'line',
                    // showSymbol:false,
                    showAllSymbol: true,
                    symbolSize: 1 | 2,
                    smooth: false, //true 为平滑曲线，false为直线
                    hoverAnimation:true,
                    data: (() => {
                        switch (this.state.xType) {
                        case 'days': return (() => {
                            let result = [];
                            this.state.datas.forEach(element => {
                                if(element.videoResourceUsage === 'NaN') {
                                    element.videoResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), (element.videoResourceUsage * 100).toString().slice(0, 4)]);
                            });
                       
                            return result;
                        })();
                        case 'weeks': return (() => {
                            const result = [];
                            this.state.datas.forEach(element => {
                                if(element.videoResourceUsage === 'NaN') {
                                    element.videoResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), (element.videoResourceUsage * 100).toString().slice(0, 4)]);
                            });
                            return result;
                        })();
                        case 'months': return (() => {
                            const result = [];
                            this.state.datas.forEach(element => {
                                if(element.videoResourceUsage === 'NaN') {
                                    element.videoResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), (element.videoResourceUsage * 100).toString().slice(0, 4)]);
                            });
                            return result;
                        })();
                        default:
                            console.log(`no matched xType ${this.state.xType}`);
                        }
                    })(),
                   
                    // markLine: {
                    //     silent: true,
                    //     data: [ {
                    //         yAxis:80,
                    //         color:'#FA7A4D'
                    //     }]
                    // },
                 
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(51,164,253,1)' //同一个红色，透明度0.12
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0.28)' //同一个红色，透明度0
                                }],
                                globalCoord: false
                            }
                        }
                    }
                }
            ]
        };
        return option;
    }


    getOptionAudio() {
        const option = {
            title: {
                text: '音频资源利用率'
            },
            lineStyle: {
                normal: {
                    // color: '#0D94FF',
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#0D94FF' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#68BCFF' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 4
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let date = new Date(params[0].value[0]);
                    let data = date.getFullYear() + '-'
                        + (date.getMonth() + 1) + '-'
                        + date.getDate() + ' '
                        + date.getHours() + ':'
                        + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
                    return '利用率：' +  params[0].value[1] + '% <br/> 日期：' + data;
                },
                textStyle:{color:'#333'},
                backgroundColor:'rgba(255,255,255,1)',
                axisPointer:{
                    type:'line',
                    axis:'x'
                }
            },
            dataZoom: [{
                startValue:this.state.datas ? new Date(this.state.datas[0]['time']) : ''
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                show:false,
                pieces: [{
                    gt: 80,
                    lte: 100,
                    // color: '#FA7A4D'
                    color: '#0D94FF'
                }],
                outOfRange: {
                    color: '#0D94FF'
                }
            },
            xAxis: [
                {
                    type: 'time',
                    splitNumber: 20,
                    interval:3600 * 4 * 1000,
                    splitLine: {
                        show: false
                    }
                }],
            yAxis: [{
                type: 'value',
                scale: true,
                max: 100,
                min: 0,
                splitNumber: 5,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            }],
            series: [
                {
                    name: '利用率',
                    type: 'line',
                    // showSymbol:false,
                    showAllSymbol: true,
                    symbolSize: 1 | 2,
                    smooth: false, //true 为平滑曲线，false为直线
                    hoverAnimation:true,
                    data: (() => {
                        switch (this.state.xType) {
                        case 'days': return (() => {
                            let result = [];
                            this.state.datas.forEach(element => {
                                if(element.audioResourceUsage === 'NaN') {
                                    element.audioResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), (element.videoResourceUsage * 100).toString().slice(0, 4)]);
                            });
                            return result;
                        })();
                        case 'weeks': return (() => {
                            const result = [];
                            this.state.datas.forEach(element => {
                                if(element.audioResourceUsage === 'NaN') {
                                    element.audioResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), (element.videoResourceUsage * 100).toString().slice(0, 4)]);
                            });
                            return result;
                        })();
                        case 'months': return (() => {
                            const result = [];
                            this.state.datas.forEach(element => {
                                if(element.audioResourceUsage === 'NaN') {
                                    element.audioResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), (element.videoResourceUsage * 100).toString().slice(0, 4)]);
                            });
                            return result;
                        })();
                        default:
                            console.log(`no matched xType ${this.state.xType}`);
                        }
                    })(),
                   
                    // markLine: {
                    //     silent: true,
                    //     data: [ {
                    //         yAxis:80,
                    //         color:'#FA7A4D'
                    //     }]
                    // },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(51,164,253,1)' //同一个红色，透明度0.12
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0.28)' //同一个红色，透明度0
                                }],
                                globalCoord: false
                            }
                        }
                    }
                }
            ]
        };
        return option;
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56]
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56]
        };
    }
    handleTimeChange = (e) => {
        let type = '';
        switch (e.target.value) {
        case 'days': type = 'SORT_BY_DAY';
            break;
        case 'weeks': type = 'SORT_BY_WEEK';
            break;
        case 'months': type = 'SORT_BY_MONTH';
            break;
        default: console.log(`no matched type: ${e.target.value}`);
        }
        this.getMcuResource(type);
        this.setState({
            xType: e.target.value
        });
    }
    render() {
        const { intl } = this.props;
        return (
            !this.state.hasData ? <div style={{height:680}}>
                <h1>{t('MCU_Loading')}</h1></div> :
                (this.state.emptyData ? <div style={{height:680}}>
                    <h1>{t('MCU_resourceTip')}</h1>
                </div> 
                    : <div>
                        <div className={cssObj.title}>
                            <span style={{ color: '#333333', fontSize: '14px', marginRight: 25 }}>统计时段</span>
                            <RadioGroup defaultValue={this.state.xType} onChange={this.handleTimeChange}>
                                <Radio value="days">{t('LastDay')}</Radio>
                                <Radio value="weeks">{t('LastWeek')}</Radio>
                                <Radio value="months">{t('LastMonth')}</Radio>
                                <Radio value="AnyDay">{t('AnyDay')}
                                    <RangePicker
                                        style={{ marginLeft: 20 }}
                                        disabledDate={this.disabledDate}
                                        disabledTime={this.disabledRangeTime}
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    /></Radio>
                            </RadioGroup>
                        </div>
                        <div>
                            <ReactEcharts
                                option={this.getOptionVideo()}
                                style={{ height: '425px', width: '1500px' }}
                                className="react_for_echarts"
                            />
                        </div>
                        <div>
                            <ReactEcharts
                                option={this.getOptionAudio()}
                                style={{ height: '425px', width: '1500px' }}
                                className="react_for_echarts"
                            />
                        </div>

                    </div>)
        );
    }

}
export default injectIntl(McuResouce);
