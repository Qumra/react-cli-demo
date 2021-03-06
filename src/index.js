import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Router from '@/config/router';
import { LocaleProvider } from 'antd';
import { antd_locale } from '@/config/i18n'
import store from './store.js';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            locale:store.getState().locale
        };
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        let locale = store.getState().locale;
        this.setState({ locale })
    }
    render() {
        return (
            <LocaleProvider locale={antd_locale}>
                <Router />
            </LocaleProvider>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
console.log(csm)
// let param = {username: "admin", password: "Change_Me", callback: function(data){ console.log(data)} }
// csm.start();
// csm.setServerAddress("127.0.0.1");
