import React, { Component } from 'react';
import cssObj from './AddMcu.css';
import { Icon, Steps } from 'antd';
import LinkMcuDevice from './LinkMcuDevice';
const {Step} = Steps;
class AddMcu extends Component {
    render() {
        return(
            <div className={cssObj.addMcu}>
                <div className={cssObj.mcuContent}>
                    <div className={cssObj.mcuContentTitle}>
                        <Icon type="left-circle" theme="outlined" className={cssObj.leftIcon}/>
                        <span>MCU管理</span>
                        <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                    </div>
                    <div className={cssObj.mcuContentMid}>
                        <div className={cssObj.mcuContentMidpadding}>
                            <div className={cssObj.steps}>
                                <Steps current={1}>
                                    <Step title="连接设备" />
                                    <Step title="基本信息" />
                                    <Step title="参数配置" />
                                    <Step title="完成" />
                                </Steps>
                            </div>
                            <div className={cssObj.mcuContentMidTitle}>
                            连接设备后，SMC就可下发配置到要添加的MCU，同时实现SMC对MCU的管理；如连接不上，只能暂添加为SMC不可管理的MCU
                            </div>
                            <LinkMcuDevice></LinkMcuDevice>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default AddMcu;
