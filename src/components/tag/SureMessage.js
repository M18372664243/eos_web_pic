import React, { Component } from 'react';
import {Upload,Icon, message,Modal,Button, Form, Input, Select, AutoComplete,Spin} from 'antd';
import config from "../config/config";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class SureMessage extends Component{
    state = {
        autoCompleteResult: [],
        passType:2,
    };

    constructor(props){
        super(props);
    }
    handleChange = (val) =>{
        this.setState({
            passType:val
        })
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { visible, onCancel,onCreateNotice, onCreate, form, okText, title,up,postData,inModal,outModal,toggle,toggle1,loading1,type} = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        const props = {
            name: 'image',
            action:config.baseUrl+"pfcase/upload", /*type=="pic"?config.baseUrl+"pfcase/upload":(type=="dapps"?config.baseUrl+"pfcase/uploadDappsPic":config.baseUrl+"pfcase/uploadGroupsPic"),*/
            accept:"image/*",
            data:{type:type},
            showUploadList:false,
            listType: 'picture',
            defaultFileList: [],
            beforeUpload(){
                //outModal();
                var dom=document.getElementsByClassName("ant-btn ant-btn-primary ant-btn-lg");
                dom[0].disabled=true;
                toggle();
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    info.fileList = []
                    if(info.file.response.code==200 && info.file.response.success){
                        if(info.file.response.data.result==1){
                            //up(info.file.response.data.pic);
                            form.setFieldsValue({
                                icon: info.file.response.data.pic.icon,
                            });
                            console.log("上传成功");

                        }else{
                            console.log(info.file.response.msg)
                        }
                    }
                    else{
                        console.log("服务器错误");
                    }
                    var dom=document.getElementsByClassName("ant-btn ant-btn-primary ant-btn-lg");
                    dom[0].disabled=false;
                    toggle1();
                    message.success(`${info.file.name} file uploaded successfully`);
                    //inModal();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                    //inModal();
                    var dom=document.getElementsByClassName("ant-btn ant-btn-primary ant-btn-lg");
                    dom[0].disabled=false;
                    toggle1();
                }
            },
        };
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const FormItemLayoutHidden = {
            labelCol: { span: 0 },
            wrapperCol: { span: 0 },
        };
        const PhoneBefore = <p style={{ width: 40 }}>+86</p>;

        return (
            <Modal
                visible={visible}
                okButtonProps={{disabled:true}}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={type=="notice"?onCreateNotice:onCreate}
                closable={false}
                maskClosable={false}
                keyboard={false}
                destroyOnClose={true}

            >
                {
                    type == "notice" ?  <Form layout="horizontal">
                            <FormItem {...FormItemLayoutHidden} required={true} label="公告id">
                                {getFieldDecorator('id', {initialValue: postData.id})(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...FormItemLayout} required={true} label="公告内容">
                                {getFieldDecorator('content', {initialValue: postData.name})(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...FormItemLayout} required={true} label="公告链接">
                                {getFieldDecorator('link', {initialValue: postData.link,})(
                                    <Input/>
                                )}
                            </FormItem>
                                <FormItem label="公告类型" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('noticetype', {initialValue: postData.noticetype})(
                                        <Select>
                                            <Option value="1">内部公告</Option>
                                            <Option value="2">外部公告</Option>
                                            <Option value="3">群公告</Option>
                                        </Select>
                                    )}
                                </FormItem>
                        </Form> :
                        <Form layout="horizontal">
                            <FormItem {...FormItemLayoutHidden} required={true} label="图片id">
                                {getFieldDecorator('id', {initialValue: postData.id})(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...FormItemLayout} required={true} label="图片名">
                                {getFieldDecorator('name', {initialValue: postData.name})(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...FormItemLayout} required={true} label="图片链接">
                                {getFieldDecorator('link', {initialValue: postData.link,})(
                                    <Input/>
                                )}
                            </FormItem>
                            {
                                postData.linktype == "" ? null :
                                    <FormItem label="链接类型" {...FormItemLayout} hasFeedback>
                                        {getFieldDecorator('linktype', {initialValue: postData.linktype})(
                                            <Select>
                                                <Option value="0">空链接</Option>
                                                <Option value="1">内部链接</Option>
                                                <Option value="2">外部链接</Option>
                                                <Option value="3">群链接</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                            }
                            <FormItem {...FormItemLayoutHidden} required={true} label="图片地址">
                                {getFieldDecorator('icon', {initialValue: postData.icon})(
                                    <Input disabled={true}/>
                                )}
                            </FormItem>
                            <Spin spinning={loading1}>
                                <div style={{textAlign: "center", width: "100%"}}>
                                    <Upload  {...props}>
                                        <Button>
                                            <Icon type="upload"/> 上传图片
                                        </Button>
                                    </Upload>
                                </div>
                            </Spin>
                        </Form>
                }
               {/* <Dragger {...props}

                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖动图片到此上传</p>
                </Dragger>*/}
            </Modal>


        );

    }

}

const SureMessageForm = Form.create()(SureMessage);
export default SureMessageForm;