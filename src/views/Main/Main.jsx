import React, { Component } from "react";
import Header from './Header'
import Bottom from './Bottom'
import cssObj from './Main.css'
import meetCreate from '@/views/meetCreate/meetCreate'
import Config from '@/views/system/Config/Config'
import defaultIndex from './defaultIndex'
import { Route,Link,withRouter} from 'react-router-dom';
import {  Breadcrumb } from 'antd';
import intl from '@/config/i18n'
const Topic = ({ match }) => {
    return <div style={{width:"300px",height:"300px",textAlign:"center",lineHeight:"300px",background:'#'+match.params.background}}><h3 style={{color:"#fff"}}>莫兰迪色系</h3></div>
};
const Main = withRouter(props => {
    const { location, match } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                {/* <Link to={url}> */}
                {intl.get(_)}
                {/* </Link> */}
            </Breadcrumb.Item>
        );
    });

    
    return (
        <div className={cssObj.Main}>
            <Header></Header>
            <div className={cssObj.content}>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            <Route  path={`${match.url}/home`} component={defaultIndex}></Route>
            <Route  path={`${match.url}/Conference/blue`}  component={Topic} />
            <Route  path={`${match.url}/Conference/meetCreate`}  component={meetCreate}></Route>
            <Route  path={`${match.url}/system/Config`}  component={Config}></Route>
            </div>
            <Bottom></Bottom>
        </div>
    );
});
export default Main
