import React, { Component } from 'react';
import Echarts from '../components/Echarts';
import moment from 'moment';
import { Radio, DatePicker  } from 'antd';
import cssObj from './McuResouce.css';
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
class McuResouce extends Component {
    constructor(props) {
        super(props);
        // console.log(1);
    }
    state = {
        value: 4,
        time:'month'
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value
        });
    }
    disabledDate=(current) =>{
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

     disabledRangeTime = (_, type)=> {
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
         this.setState({ time: e.target.value });
     }
     render() {
         return (
             <div>
                 <div className={cssObj.title}>
                     <span style={{color: '#333333', fontSize:'14px', marginRight:25}}>统计时段</span>
                     <RadioGroup onChange={this.onChange} value={this.state.value}>
                         <Radio value={1}>昨天</Radio>
                         <Radio value={2}>最近7天</Radio>
                         <Radio value={3}>最近30天</Radio>
                         <Radio value={4}>自定义时间 
                             <RangePicker
                                 style={{marginLeft:20}}
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
                     <Radio.Group value={this.state.time} onChange={this.handleTimeChange}>
                         <Radio.Button value="day">按天</Radio.Button>
                         <Radio.Button value="week">按周</Radio.Button>
                         <Radio.Button value="month">按月</Radio.Button>
                     </Radio.Group>
                 </div>
                 <Echarts></Echarts>
             </div>
         );
     }
}
export default McuResouce;
