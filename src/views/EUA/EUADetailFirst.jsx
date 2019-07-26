import React, { Component } from 'react';
import {Icon } from 'antd';
import cssObj from './EUADetailFirst.css';
import FirstBaseForm from './FirstBaseForm';
class EUADetailFirst extends Component {
    render() {
        
        return (<div className={cssObj.euaMain}>
            <div className={cssObj.leftNav}>111</div>
            <div className={cssObj.euaContent}>
                <div className={cssObj.euaContentTitle}>
                    <span>企业通讯录管理</span>
                    <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                </div>
                {/* <div className={cssObj.euaContentMid}>
                    <div className={cssObj.unlink}>
                        <img src="" alt="未对接图" className={cssObj.unlinkImg}/>
                        <div className={cssObj.linkButton}>对接地址本服务器</div>
                        <span>还未对接地址本服务器，请对接服务器</span>
                    </div>
                </div> */}
                <FirstBaseForm></FirstBaseForm>
            </div>
        </div>);
    }
}
export default EUADetailFirst;
