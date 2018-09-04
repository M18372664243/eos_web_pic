import React, { Component } from 'react';
import '../../style/login.less';
import { Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd';
import axios from 'axios';
import config from '../config/config';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
        isRegist:false,
    };
    handleLogin = (values) =>{
        var that =this;
        var params = {"name":values.username,"password":values.password}
        axios.post(config.baseUrl+"eos_web/v1/login",JSON.stringify(params),{headers:{"Content-Type":"application/json"}}).then(function (res) {
            if(res.data.code == 200 && res.data.success){
                sessionStorage.setItem("userName",res.data.data.userName);
                message.success('登陆成功!');
                that.props.history.push({pathname:'/eos_web_manage/form',state:values.username});
            }else {
                message.error(res.data.msg);
            }
        }).catch(function (err) {
            console.log("err:"+err);
        })
    }
    // handleRegiste = (values) =>{
    //     var params = {"name":values.username,"password":values.password}
    //     var that = this;
    //     axios.post(config.baseUrl+"eos_web/v1/regist",JSON.stringify(params),{headers:{"Content-Type":"application/json"}}).then(function (res) {
    //         if(res.data.code == 200 && res.data.success){
    //             localStorage.setItem("userName",res.data.data.userName);
    //             message.success('注册成功!');
    //             that.props.history.push({pathname:'/eos_web_manage/form',state:values.username});
    //         }else {
    //             message.error(res.data.msg);
    //         }
    //     }).catch(function (err) {
    //         console.log("err:"+err);
    //     })
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // if(this.state.isRegist){
                //     this.handleRegiste(values)
                // }else {
                //     this.handleLogin(values)
                // }
                this.handleLogin(values)
            }
        });
    };
    goToRegiste = () =>{
        this.setState({
            isRegist:true,
        })
    }
    goToLogin = () =>{
        this.setState({
            isRegist:false,
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                <div style={{position:"absolute",top:"25%",left:"50%",width:"200px",marginLeft:"-100px",textAlign:"center",fontSize:"28px"}}>Athena后台管理</div>
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                {/*{this.state.isRegist?"注册":"登录"}*/}
                                登陆
                            </Button>
                            {/*{this.state.isRegist?<a onClick={this.goToLogin}>返回</a>:<a onClick={this.goToRegiste}>现在就去注册!</a>}*/}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;