import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';
import  testimg from '../tag/宁话首图.png'
import './Modal.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class ProveImg extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);

    }
    render(){
        const { visible, onCancel, title ,imgSrc,name,companyname} = this.props;
        
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
                // title={name+'的'+title}
                /*okText={okText}*/
                onCancel={onCancel}
                /*onOk={onCreate}*/
                closable={true}
                maskClosable={false}
                keyboard={false}
                destroyOnClose={true}
                footer={null}
                width={900}
                imgSrc={imgSrc}
                bodyStyle={{padding:'0px',lineHeight: '1px' }}
                wrapClassName ={'web'}
            >
                <img src={imgSrc} width={'100%'}  style={{height:'500px',backgrpundSize:"100% 100%"}}/>
            </Modal>
        );
    }
}

const ProveImgForm = Form.create()(ProveImg);
export default ProveImgForm;