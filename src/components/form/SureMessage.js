import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class SureMessage extends Component{
    state = {
        autoCompleteResult: [],
        passType:2
    };
    constructor(props){
        super(props);

    }
    /*componentDidMount(){
        axios.get('/address')
            .then(function (response) {
                response.data.map(function(province){
                    options.push({
                        value: province.name,
                        label: province.name,
                        children: province.city.map(function(city){
                            return {
                                value: city.name,
                                label: city.name,
                                children: city.area.map(function(area){
                                    return {
                                        value: area,
                                        label: area,
                                    }
                                })
                            }
                        }),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }*/
    /*handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };*/
    handleChange = (val) =>{
        this.setState({
            passType:val
        })
    }
    render(){
        const { visible, onCancel, onCreate, form, okText, title,authType} = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const PhoneBefore = <p style={{ width: 40 }}>+86</p>;
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={()=>{onCreate(this.state.passType)}}
                closable={false}
                maskClosable={false}
                keyboard={false}
                destroyOnClose={false}
            >
                <Form layout="horizontal">
                    {/*{authType=="pass"?<FormItem label="认证等级" {...FormItemLayout} hasFeedback>*/}
                        {/*{getFieldDecorator('value', {*/}
                            {/*rules: [{ required: true, message: '请选择认证等级！' }],*/}
                        {/*})(*/}
                            {/*<Select defaultValue="个人认证" onChange={this.handleChange}>*/}
                                {/*<Option value="1">企业认证</Option>*/}
                                {/*<Option value="2">个人认证</Option>*/}
                                {/*<Option value="3">大V认证</Option>*/}
                            {/*</Select>*/}
                        {/*)}</FormItem>:null}*/}
                    {authType=="pass"?<FormItem label="认证等级" {...FormItemLayout} hasFeedback>
                        <Select defaultValue="个人认证" onChange={this.handleChange}>
                            <Option value="1">企业认证</Option>
                            <Option value="2">个人认证</Option>
                            <Option value="3">大V认证</Option>
                        </Select></FormItem>
                        :null}

                    <FormItem label="认证信息" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入认证信息！' }],
                        })(
                            <Input />
                        )}

                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const SureMessageForm = Form.create()(SureMessage);
export default SureMessageForm;