import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import history from '@/config/history';
import { regExpConfig } from '@/config/Reg.confing'
import cssObj from './LoginContain.css'
import intl from '@/config/i18n'
import { setCookie, getCookie,clearCookie } from '@/util/cookie'
const FormItem = Form.Item;
class LoginContain extends Component {
  constructor(){
    super()
    this.state={
      username:"",
      password:""
    }
  }
  componentDidMount() {
    this.setState({
      username:getCookie('userName'),
      password: getCookie('password')
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
   this.props.form.validateFields((err, values) => {
        function logincallback (res) {
        console.log(res)
        if (res.status != 200) {
          console.log("请求失败")
        } else {
          if (values.remember) {
            setCookie('userName', values.username, 7);
            setCookie('password', values.password, 7);
          }else{
            clearCookie('userName');
            clearCookie('password')
          }
          history.push({ pathname: '/main/home' })
        }
      }
      if (!err) {
        csm.getConfig().setUsername(values.username)
          .setPassword(values.password)
          .setServerAddress("127.0.0.1")
          csm.registOpCallback("login", logincallback)
          csm.start()
      }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={cssObj.loginForm}>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: this.state.username,
            rules: [
              { required: true, message: 'Please input your username!' },
              { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
            ],

          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={intl.get('username')} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: this.state.password,
            rules: [
              { required: true, message: 'Please input your Password!' },
              { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
            ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={intl.get('password')} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>{intl.get('remember_me')}</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className={cssObj.formButton}>
            {intl.get('login')}
          </Button>
        </FormItem>
      </Form>
    );
  }
}
LoginContain = Form.create()(LoginContain);
export default LoginContain
