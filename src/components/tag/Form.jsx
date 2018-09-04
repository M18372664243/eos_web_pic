import React, { Component } from 'react';
import './form.less';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Button,Select} from 'antd';


import FormTable from './FormTable';
import config from '../config/config';
import './button.css'
import SureMessageForm from './SureMessage'
var Lang="zh";
export default class UForm extends Component{
    constructor(props) {
        super(props);
        if(sessionStorage.getItem("userName")==null){
            this.props.history.push('/eos_web_pic');
        }
        this.state = {
            auth:true,
            total:0,
            size:10,
            dataSource:[],
            visible:false,
            loading:false,
            data:{},
            selectedRowKeys: [],
            currentPage:1,
            pic:{},
            loading1:false,
            type:"pic",
            Language:"zh",
        };
    }
    componentDidMount(){
        this.getData1(0);
    }
    toggle = () => {
        this.setState({ loading1: true });
    }
    toggle1 = () => {
        this.setState({ loading1: false });
    }
    //未通过列表
    getData = (offset) => {
        var param
        if(offset==undefined){
            offset = 0;
        }
        param ="offset="+offset+"&limit="+this.state.size
        axios.get(config.baseUrl+"usertagweb/v1/getUserTagsWeb?"+param,{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.data.code==200&&response.data.success){
                var dataArr = response.data.data.webTags;
                var totalCount = response.data.data.totalNumber;
                var data =[];
                for(var i =0;i <dataArr.length;i++){
                    var user ={}
                    user.key = dataArr[i].uid;
                    user.uid = dataArr[i].uid;
                    user.name = dataArr[i].tagged_name;
                    user.company = dataArr[i].company
                    user.position = dataArr[i].position
                    user.CompanyAndPosition =dataArr[i].company+dataArr[0].position;
                    user.tagTimes =dataArr[i].tagTimes
                    data.push(user);
                }
                this.setState({
                    dataSource:data,
                    total:totalCount,
                    loading:false
                })
            }else {
                alert(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })
    };
//拉取图片列表
    getData1 = (offset) => {
        var param
        if(offset==undefined){
            offset = 0;
        }
        //param ="offset="+offset+"&limit="+this.state.size
        param="?lang="+Lang;
        axios.get(config.baseUrl+"pfcase/pics"+param,{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.data.code==200&&response.data.success){
                var dataArr = response.data.data.pics;
                var data =[];
                if(dataArr){
                    for(var i =0;i <dataArr.length;i++){
                        var pic={}
                        pic.key=dataArr[i].id;
                        pic.id = dataArr[i].id;
                        pic.name = dataArr[i].name=='null'?'':dataArr[i].name;
                        pic.link = dataArr[i].link=='null'?'':dataArr[i].link;
                        pic.linktype = dataArr[i].linktype;
                        pic.icon = dataArr[i].icon;
                        pic.seq =dataArr[i].seq;
                        data.push(pic);
                    }
                }else{
                    var pic={};
                    pic.key=1;
                    pic.id = 1;
                    pic.name = "test";
                    pic.link = "www.test.com";
                    pic.linktype = 1;
                    pic.icon = "link"
                    pic.seq =1;
                    data.push(pic);
                }
                this.setState({
                    dataSource:data,
                    //total:totalCount,
                    loading:false,
                    visible: false,
                    pic:{}
                })
            }else {
                alert(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })
    };
    getData2 = (offset) => {
        var param
        if(offset==undefined){
            offset = 0;
        }
        // param="?lang="+this.state.Language;
        debugger
        param="?lang="+Lang;
        axios.get(config.baseUrl+"pfcase/v2/dapps"+param,{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.data.code==200&&response.data.success){
                var dataArr = response.data.data.dapps;
                var data =[];
                if(dataArr){
                    for(var i =0;i <dataArr.length;i++){
                        var dapp={}
                        dapp.key=dataArr[i].dappid;
                        dapp.id = dataArr[i].dappid;
                        dapp.name = dataArr[i].dappname=='null'?'':dataArr[i].dappname;
                        dapp.link = dataArr[i].dapplink=='null'?'':dataArr[i].dapplink;
                        dapp.deleted = dataArr[i].deleted;
                        dapp.icon = dataArr[i].dappicon;
                        dapp.seq =dataArr[i].seq;
                        data.push(dapp);
                    }
                }else{
                    var pic={};
                    pic.key=1;
                    pic.id = 1;
                    pic.name = "test";
                    pic.link = "www.test.com";
                    pic.linktype = 1;
                    pic.icon = "link"
                    pic.seq =1;
                    data.push(pic);
                }
                this.setState({
                    dataSource:data,
                    //total:totalCount,
                    loading:false,
                    visible: false,
                    pic:{}
                })
            }else {
                alert(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })
    };
    getData3 = (offset) => {
        var param
        if(offset==undefined){
            offset = 0;
        }
        // param="?lang="+this.state.Language;
        param="?lang="+Lang;
        axios.get(config.baseUrl+"pfcase/UserBonusInfo"+param,{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.status==200){
                var dataArr = response.data.groups;
                var data =[];
                if(dataArr){
                    for(var i =0;i <dataArr.length;i++){
                        var group={}
                        group.key=dataArr[i].groupid;
                        group.id = dataArr[i].groupid;
                        group.name = dataArr[i].groupname=='null'?'':dataArr[i].groupname;
                        group.link = dataArr[i].grouplink=='null'?'':dataArr[i].grouplink;
                        group.deleted = dataArr[i].deleted;
                        group.icon = dataArr[i].groupicon;
                        group.seq =dataArr[i].seq;
                        data.push(group);
                    }
                }else{
                    var pic={};
                    pic.key=1;
                    pic.id = 1;
                    pic.name = "test";
                    pic.link = "www.test.com";
                    pic.linktype = 1;
                    pic.icon = "link"
                    pic.seq =1;
                    data.push(pic);

                }
                this.setState({
                    dataSource:data,
                    //total:totalCount,
                    loading:false,
                    visible: false,
                    pic:{}
                })
            }else {
                alert(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })
    };
    getData4 = (offset) => {
        var param
        if(offset==undefined){
            offset = 0;
        }
        // param="?lang="+this.state.Language;
        param="?lang="+Lang;
        axios.get(config.baseUrl+"pfcase/dappsWechat"+param,{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.status==200){
                var dataArr = response.data.data.dappsWechat;
                var data =[];
                if(dataArr){
                    for(var i =0;i <dataArr.length;i++){
                        var dappsWx={}
                        dappsWx.key=dataArr[i].dappid;
                        dappsWx.id = dataArr[i].dappid;
                        dappsWx.name = dataArr[i].dappname=='null'?'':dataArr[i].dappname;
                        dappsWx.link = dataArr[i].dapplink=='null'?'':dataArr[i].dapplink;
                        dappsWx.deleted = dataArr[i].deleted;
                        dappsWx.icon = dataArr[i].dappicon;
                        dappsWx.seq =dataArr[i].seq;
                        data.push(dappsWx);
                    }
                }else{
                    var pic={};
                    pic.key=1;
                    pic.id = 1;
                    pic.name = "test";
                    pic.link = "www.test.com";
                    pic.linktype = 1;
                    pic.icon = "link"
                    pic.seq =1;
                    data.push(pic);

                }
                this.setState({
                    dataSource:data,
                    //total:totalCount,
                    loading:false,
                    visible: false,
                    pic:{}
                })
            }else {
                alert(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })
    };
    getData5 = (offset) => {
        var param
        if(offset==undefined){
            offset = 0;
        }
        // param="?lang="+this.state.Language;
        param="?lang="+Lang;
        var testData=[{
            key:1,
            id:1,
            content:"content",
            link:"www.baidu.com",
            noticetype:1,
            timestamp:moment(1535969371).format("YYYY-MM-DD HH:mm:ss")
        },{
            key:2,
            id:2,
            content:"content",
            link:"www.baidu.com",
            noticetype:1,
            timestamp:moment(1535969371).format("YYYY-MM-DD HH:mm:ss")
        },{
            key:3,
            id:3,
            content:"content",
            link:"www.baidu.com",
            noticetype:1,
            timestamp:moment(1535969371).format("YYYY-MM-DD HH:mm:ss")
        },{
            key:4,
            id:4,
            content:"content",
            link:"www.baidu.com",
            noticetype:1,
            timestamp:moment(1535969371).format("YYYY-MM-DD HH:mm:ss")
        },{
            key:5,
            id:5,
            content:"content",
            link:"www.baidu.com",
            noticetype:1,
            timestamp:moment(1535969371).format("YYYY-MM-DD HH:mm:ss")
        }]
        this.setState({
            dataSource:testData,
            //total:totalCount,
            loading:false,
            visible: false,
            pic:{}
        })
       /* axios.get(config.noticeBaseUrl+"back-service/notice/v1/list",{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.data.code==1){
                var dataArr = response.data.data;
                var data =[];
                if(dataArr){
                    for(var i =0;i <dataArr.length;i++){
                        var notice={}
                        notice.key=dataArr[i].id;
                        notice.id = dataArr[i].id;
                        notice.content = dataArr[i].content=='null'?'':dataArr[i].content;
                        notice.link = dataArr[i].link=='null'?'':dataArr[i].link;
                        notice.noticetype=dataArr[i].type;
                        notice.timestamp =moment(dataArr[i].timestamp).format("YYYY-MM-DD HH:mm:ss");
                        data.push(notice);
                    }
                }else{
                   console.log("获取数据为空")
                }
                this.setState({
                    dataSource:data,
                    //total:totalCount,
                    loading:false,
                    visible: false,
                    pic:{}
                })
            }else {
                console.log(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })*/
    };
    //转换时间
    parseDate = (timeStamp) =>{
        var date= new Date(timeStamp)
        var year =date.getFullYear()+ '-';
        var month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var day = date.getDate() + ' ';
        return year+month+day;
    }

    //通过列表
    // getPassTag =(offset) =>{
    //     var param
    //     if(offset==undefined){
    //         offset = 0;
    //     }
    //     param ="offset="+offset+"&limit="+this.state.size
    //     axios.get(config.baseUrl+"usertagweb/v1/getApproveList",{headers:{"Content-Type":'application/json'}}).then(function (response){
    //         if(response.data.code==200&&response.data.success){
    //             var dataArr = response.data.data.entitys;
    //             var totalCount = response.data.data.count;
    //             var data =[];
    //             for(var i =0;i <dataArr.length;i++){
    //                 var user ={}
    //                 user.authId = dataArr[i].approver_id;
    //                 user.authTime = this.parseDate(dataArr[i].updateTime);
    //                 user.uid = dataArr[i].uid;
    //                 user.name = dataArr[i].name;
    //                 user.company = dataArr[i].company
    //                 user.position = dataArr[i].position
    //                 user.CompanyAndPosition =dataArr[i].company+dataArr[0].position;
    //                 data.push(user);
    //             }
    //             this.setState({
    //                 dataSource:data,
    //                 total:totalCount,
    //                 loading:false
    //             })
    //         }else {
    //             alert(response.data.msg);
    //         }
    //     }.bind(this)).catch(function (err) {
    //         console.log("err:"+err)
    //     })
    // }


    // getApplys =(type)=>{
    //     this.setState({
    //         loading:true,
    //         currentPage:1
    //     })
    //     if("pic" == type){
    //         this.setState({
    //             auth:true,
    //         })
    //         this.getData(0)
    //     }
    //     if("dapps" == type){
    //         this.setState({
    //             auth:false,
    //         })
    //         this.getPassTag(0)
    //     }
    // }
    getSelect =(type)=>{
        this.setState({
            loading:true,
            currentPage:1,
            type:type,
        })
        if("pic" == type){
            this.getData1(0)
        }
        if("dapps" == type){
            this.getData2(0)
        }
        if("groups" == type){
            this.getData3(0)
        }
        if("dappswx" == type){
            this.getData4(0)
        }
        if("notice" == type){
            this.getData5(0)
        }
    }
    //审核操作
    onPass = (id,name,link,linktype,icon,type) =>{
        var data ={}
        data.id = id
        data.name =name,
        data.link =link
        data.linktype =linktype.toString()
        data.icon = icon
        data.type=type
        const form = this.form;
        form.setFieldsValue({
            id:id,
            name: name,
            link:link,
            linktype:linktype.toString(),
            icon:icon,
        });
        this.setState({
            visible:true,
            data:data,
        })
    }

    onPassNotice = (id,content,link,noticetype,timestamp,type) =>{
        var data ={}
        data.id = id
        data.content =content,
        data.link =link
        data.noticetype =noticetype.toString()
        data.type=type
        const form = this.form;
        form.setFieldsValue({
            id:id,
            content: content,
            link:link,
            noticetype:noticetype.toString(),
        });
        this.setState({
            visible:true,
            data:data,
        })
    }
    saveFormRef = (form) => {
        this.form = form;
    };
    up=(pic)=>{
        this.setState({
            pic: pic,
        });
    }
    //提交认证信息
    handleCreate = (/*id,linkType, pictureName, pictureLink,picIcon*/) => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            var postData;
            if(this.state.type=="notice"){
                var id=values.id;
                var type=values.noticetype;
                var content=values.content;
                var link=values.link;
                postData={
                    id:id,
                    type:type,
                    content:content,
                    link:link,
                };
            }else{
                var id=values.id;
                var pictureName=values.name;
                var pictureLink=values.link;
                var picIcon=values.icon;
                //var params;
                postData={
                    id:id,
                    name:pictureName,
                    link:pictureLink,
                    icon:picIcon,
                };
                if(values.linktype){
                    var linkType=values.linktype;
                    postData.linktype=linkType;
                    //params="id="+id+"&linkType="+linkType+"&pictureName="+pictureName+"&pictureLink="+pictureLink+"&icon="+picIcon
                }else{
                    //params="id="+id+"&pictureName="+pictureName+"&pictureLink="+pictureLink+"&icon="+picIcon
                }
            }

           /* var icon

            if(this.state.pic.icon){
                icon=this.state.pic.icon
            }else{
                icon=picIcon
            }
            params=params+ "&icon="+icon*/
            var uploadUrl;
            switch (this.state.type) {
                case "pic":uploadUrl="pfcase/imgUpdate";break;
                case "dapps":uploadUrl="pfcase/dappUpdate";break;
                case "groups":uploadUrl="pfcase/groupUpdate";break;
                case "dappswx":uploadUrl="pfcase/dappsWechatUpdate";break;
            }

            debugger
            axios.post(config.baseUrl+uploadUrl+"?lang="+Lang,postData,{headers:{"Content-Type":'application/json'}}).then(function (response){
                if(response.data.code==200&&response.data.success&&response.data.data.result==1){

                }else {
                    alert(response.data.msg);
                }
                switch(this.state.type){
                    case "pic":this.getData1();break;
                    case "dapps":this.getData2();break;
                    case "groups":this.getData3();break;
                    case "dappswx":this.getData4();break;
                    case "notice":this.getData5();break;
                }
                this.setState({
                    data:{},
                })
            }.bind(this)).catch(function (err) {
                console.log("err:"+err)
            })


            // var params = "uid="+tagData.key+"&company="+tagData.company+"&postion="+tagData.position+"&approver_id="+approver_id+"&approver_name="+approver_name+"&times="+tagData.tagTimes+"&name="+tagData.name+"&auditStatus="+auditStatus
            // axios.get(config.baseUrl+"usertagweb/v1/approveUser?"+params,{headers:{"Content-Type":'application/json'}}).then(function (response){
            //     if(response.data.code==200&&response.data.success){
            //         alert("审核成功")
            //         that.getData(0)
            //     }else {
            //         alert(response.data.msg);
            //     }
            // }).catch(function (error) {
            //     console.log(error)
            // })
            // form.resetFields();
            // this.setState({
            //     visible: false,
            // });
        });
    };
    handleCreateNotice = (/*id,linkType, pictureName, pictureLink,picIcon*/) => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            var postData;
            var id=values.id;
            var type=values.noticetype;
            var content=values.content;
            var link=values.link;
            postData={
                id:id,
                type:type,
                content:content,
                link:link,
            };
            debugger
            axios.post(config.noticeBaseUrl+"back-service/notice/v1/edit",postData,{headers:{"Content-Type":'application/json'}}).then(function (response){
                if(response.data.code==1){

                }else {
                    alert(response.data.msg);
                }
                this.getData5()
                this.setState({
                    data:{},
                })
            }.bind(this)).catch(function (err) {
                console.log("err:"+err)
            })
        });
    };
    //取消认证信息
    handleCancel = () => {
        const form=this.form;
        this.setState({ visible: false ,
            pic:{},
        });
        form.resetFields();
    };

    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    pageChange=(current, pageSize)=>{
        var offset = (current-1)*10
        var that = this
        this.setState({
            loading:true,
            currentPage:current
        })
        if(this.state.auth){
           that.getData(offset)
        }else {
           that.getPassTag(offset)
        }

    };
    inModal=()=>{
        this.setState({
            visible:true
        })
    }
    outModal=()=>{
        this.setState({
            visible:false
        })
    }
    loginOut = () =>{
        sessionStorage.removeItem("userName");
        this.props.history.push('/eos_web_pic');
    }
    handleChangeLanguage=(value)=> {
       Lang=value;
       this.setState({
           Language:value,
       })
        switch(this.state.type){
            case "pic":this.getData1(undefined);break;
            case "dapps":this.getData2(undefined);break;
            case "groups":this.getData3(undefined);break;
            case "dappswx":this.getData4(undefined);break;
            case "notice":this.getData5(undefined);break;
        }
    }
    render(){
        const {total,auth,visible, size, dataSource, loading,type,data,currentPage,loading1,Language} = this.state;
        const Option = Select.Option;
        let pagination = {
            total: total,
            current:currentPage,
            defaultCurrent: 1,
            pageSize: size,
            hideOnSinglePage:false,
            showSizeChanger: false,
            style:{textAlign:"center",float:"none"},
            onChange:(current, pageSize) => {
                this.pageChange(current, pageSize)
            },
           }
        return(
            <div>
                <div className='formBody'>
                    <Row gutter={24}>
                        <Col className="gutter-row" sm={8}>
                            <Select defaultValue={Lang} style={{ width: 120 }} onChange={this.handleChangeLanguage}>
                                <Option value="zh">简体中文</Option>
                                <Option value="tw">繁体中文</Option>
                                <Option value="en">英文</Option>
                                <Option value="ko">韩文</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" sm={8}>

                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <div style={{float:"right"}}>
                                {/*<span>欢迎<span style={{color:'#108ee9'}}>{localStorage.getItem("userName")}</span>,</span>*/}
                                <a onClick={this.loginOut}>退出登陆</a>
                            </div>
                        </Col>
                    </Row>
                   {/* <Row gutter={24}>
                        <Col className="gutter-row" sm={8}>
                            {auth?
                            <div style={{display:"flex"}}>
                                    <Button  onClick={()=>{this.getApplys("auth")}} style={{background:"#bfbfbf"}}>
                                        待审核
                                    </Button>
                                    <Button  onClick={()=>{this.getApplys("pass")}}>
                                        已通过
                                    </Button></div>
                                    :
                                <div style={{display:"flex"}}>
                                    <Button  onClick={()=>{this.getApplys("auth")}} >
                                        待审核
                                    </Button>
                                    <Button  onClick={()=>{this.getApplys("pass")}} style={{background:"#bfbfbf"}}>
                                        已通过
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>*/}
                    <Row gutter={24}>
                        <Col className="gutter-row" sm={8}>
                            {/*{auth?
                                <div style={{display:"flex"}}>
                                    <Button  onClick={()=>{this.getApplys("pic")}} style={{background:"#bfbfbf"}}>
                                        图片
                                    </Button>
                                    <Button  onClick={()=>{this.getApplys("dapps")}}>
                                        dapps
                                    </Button>
                                    <Button  onClick={()=>{this.getApplys("groups")}}>
                                        群组
                                    </Button>
                                </div>

                                :
                                <div style={{display:"flex"}}>
                                    <Button  onClick={()=>{this.getApplys("pic")}} >
                                        图片
                                    </Button>
                                    <Button  onClick={()=>{this.getApplys("dapps")}} style={{background:"#bfbfbf"}}>
                                        dapps
                                    </Button>
                                    <Button  onClick={()=>{this.getApplys("groups")}}>
                                        群组
                                    </Button>
                                </div>
                            }*/}
                            {( ()=>{
                                    switch(this.state.type){
                                        case "pic":return  <div style={{display:"flex"}}>
                                            <Button  onClick={()=>{this.getSelect("pic")}} style={{background:"#bfbfbf"}}>
                                                图片
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dapps")}}>
                                                dapps
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dappswx")}}>
                                                dapps微信
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("groups")}}>
                                                群组
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("notice")}}>
                                                公告
                                            </Button>
                                        </div>; break;
                                        case "dapps":return  <div style={{display:"flex"}}>
                                            <Button  onClick={()=>{this.getSelect("pic")}} >
                                                图片
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dapps")}} style={{background:"#bfbfbf"}}>
                                                dapps
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dappswx")}}>
                                                dapps微信
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("groups")}}>
                                                群组
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("notice")}}>
                                                公告
                                            </Button>
                                        </div>; break;
                                        case "groups":return  <div style={{display:"flex"}}>
                                            <Button  onClick={()=>{this.getSelect("pic")}} >
                                                图片
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dapps")}}>
                                                dapps
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dappswx")}}>
                                                dapps微信
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("groups")}} style={{background:"#bfbfbf"}}>
                                                群组
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("notice")}}>
                                                公告
                                            </Button>
                                        </div>; break;
                                        case "dappswx":return  <div style={{display:"flex"}}>
                                            <Button  onClick={()=>{this.getSelect("pic")}} >
                                                图片
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dapps")}}>
                                                dapps
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dappswx")}}  style={{background:"#bfbfbf"}}>
                                                dapps微信
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("groups")}}>
                                                群组
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("notice")}}>
                                                公告
                                            </Button>
                                        </div>; break;
                                        case "notice":return  <div style={{display:"flex"}}>
                                            <Button  onClick={()=>{this.getSelect("pic")}} >
                                                图片
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dapps")}}>
                                                dapps
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("dappswx")}}>
                                                dapps微信
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("groups")}}>
                                                群组
                                            </Button>
                                            <Button  onClick={()=>{this.getSelect("notice")}} style={{background:"#bfbfbf"}}>
                                                公告
                                            </Button>
                                        </div>; break;
                                        default:return null;
                                    }
                                }
                            )()}
                        </Col>
                        <Col className="gutter-row" sm={8}>

                        </Col>
                        <Col className="gutter-row" sm={8}>
                        </Col>
                    </Row>
                    <FormTable
                        dataSource={dataSource}
                        auth={auth}
                        onPass={this.onPass}
                        onPassNotice={this.onPassNotice}
                        editClick={this.editClick}
                        loading={loading}
                        //pagination={pagination}
                        relo={this.relo}
                        onUp={this.onUp}
                        type={type}
                    />
                    {<SureMessageForm ref={this.saveFormRef} inModal={this.inModal} loading1={loading1} toggle1={this.toggle1} toggle={this.toggle} outModal={this.outModal} postData={data} visible={visible} type={type} up={this.up} onCreateNotice={this.handleCreateNotice} onCancel={this.handleCancel} onCreate={this.handleCreate}  title="更改图片" okText="提交"/>}
                </div>
            </div>
        )
    }
}