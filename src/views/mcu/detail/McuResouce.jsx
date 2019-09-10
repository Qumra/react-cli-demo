import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { Radio, DatePicker } from 'antd';
import cssObj from './McuResouce.css';
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
    for (let i = 0; i < count; i++) {
        result.push({
            'totalResource': {
                'h263Resource': 0,
                'h264Resource': Math.ceil(Math.random() * 200 + 200),
                'h265Resource': 0,
                'encryptResource': 0,
                'bandwidthResource': 3840000,
                'siteCount': 0,
                'audioResource': 0
            },
            'usedResource': {
                'h263Resource': 0,
                'h264Resource': Math.ceil(Math.random() * 200),
                'h265Resource': 0,
                'encryptResource': 0,
                'bandwidthResource': 0,
                'siteCount': 0,
                'audioResource': 0
            }
        });
    }
    return result;
}
class McuResouce extends Component {
    constructor(props) {
        super(props);
        // console.log(1);
    }
    state = {
        time: 'month',
        xType: 'months',
        data1: mock(30),
        data2: mock(30)
    }
    getOption() {
        const option = {
            title: {
                // text: '未来一周气温变化',
                subtext: '视频资源利用率',
                subtextStyle:{
                    fontSize:'14px'
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor:'rgba(255,255,255,1)', //通过设置rgba调节背景颜色与透明度
                color:'black',
                borderWidth:'1',
                borderColor:'gray',
                textStyle:{
                    color: '#666666',
                    fontSize: '14px'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: (() => {
                    switch (this.state.xType) {
                    case 'days': return (() => {
                        let result = [];
                        let time = new Date();
                        for (let i = 0; i < 48 / 4; i++) {
                            result.push(time.getMonth() + 1 + '月' + time.getDate() + '日' + time.getHours() + '点');
                            time.setHours(time.getHours() + 4);
                        }
                        return result;
                    })();
                    case 'weeks': return (() => {
                        const result = [];
                        let date = new Date();
                        for (let i = 0; i < 14; i++) {
                            result.push(date.getMonth() + 1 + '月' + date.getDate() + '日');
                            date.setDate(date.getDate() + 1);
                        }
                        return result;
                    })();
                    case 'months': return (() => {
                        const result = [];
                        let date = new Date();
                        let days = new Date(date.getFullYear(), date.getMonth(), 0).getDate() + new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                        for (let i = 0; i < days / 3; i++) {
                            result.push(date.getMonth() + 1 + '月' + date.getDate() + '日');
                            date.setDate(date.getDate() + 3);
                        }
                        return result;
                    })();
                    default:
                        console.log(`no matched xType ${this.state.xType}`);
                    }
                })()
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: [
                {
                    name: '利用率',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: this.state.data1.map((i) => {
                        return Math.ceil(i['usedResource'].h264Resource / i['totalResource'].h264Resource * 100);
                    }),
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
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            color: 'blue'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'outer'
                            },
                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: 'red'
                                }
                            }
                        }
                    },

                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
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
    handleTimeChange=(e)=>{
        let count = 0;
        switch(e.target.value) {
        case 'days': count = 12;
            break;
        case 'weeks': count = 14;
            break;
        case 'months': count = 30;
            break;
        default:console.log(`no matched type: ${e.target.value}`);
        }
        this.setState({ 
            xType: e.target.value,
            data1:mock(count),
            data2:mock(count)
        });
    }
    render() {
        return (
            <div>
                <div className={cssObj.title}>
                    <span style={{ color: '#333333', fontSize: '14px', marginRight: 25 }}>统计时段</span>
                    <RadioGroup  value={this.state.timeSlot} >
                        {/* onChange={this.onTimeSlotChange} */}
                        <Radio value={1}>昨天</Radio>
                        <Radio value={2}>最近7天</Radio>
                        <Radio value={3}>最近30天</Radio>
                        <Radio value={4}>自定义时间
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
                <div className={cssObj.btnGroup}>
                    <Radio.Group defaultValue={this.state.xType} onChange={this.handleTimeChange}  buttonStyle="solid">
                        <Radio.Button value="days">按天</Radio.Button>
                        <Radio.Button value="weeks">按周</Radio.Button>
                        <Radio.Button value="months">按月</Radio.Button>
                    </Radio.Group>
                </div>
                <div>
                    <ReactEcharts
                        option={this.getOption()}
                        style={{ height: '425px', width: '1500px' }}
                        className="react_for_echarts"
                    />
                </div>
                
            </div>
        );
    }

}
export default McuResouce;
