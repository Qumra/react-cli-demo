import React, { Component } from 'react';
import cssObj from './AddMcu.css';
import { Icon, Button, Input, Form} from 'antd';
import AddMCUInfo from './AddMCUInfo';
class AddMcu extends Component {
    render() {
        return(
            <div className={cssObj.addMcu}>
                <div className={cssObj.mcuContent}>
                    <div className={cssObj.mcuContentTitle}>
                        <Icon type="left-circle" theme="outlined" className={cssObj.leftIcon}/>
                        <span>添加MCU</span>
                        <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                    </div>
                    <div className={cssObj.mcuContentMid}>
                        <div className={cssObj.mcuContentMidpadding}>
                            <AddMCUInfo></AddMCUInfo>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default AddMcu;
