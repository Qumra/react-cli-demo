import React, { Component } from 'react';
import {Icon } from 'antd';
import cssObj from './EUADetailFirst.css';
class EUADetail extends Component {
    render() {
        
        return (<div className={cssObj.euaMain}>
            <div className={cssObj.leftNav}>111</div>
            <div className={cssObj.euaContent}>
                <div className={cssObj.euaContentTitle}>
                    <span>企业通讯录管理</span>
                    <div className={cssObj.euaContentTitleMid}>
                        <div className={cssObj.status}>
                            <div className={cssObj.greenCircle}></div>
                        </div>
                        <div className={cssObj.mainIp}></div>
                        <div className={cssObj.spareIp}></div>
                    </div>
                    <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>

                </div>
               
            </div>
        </div>);
    }
}
export default EUADetail;
