import React, { Component } from 'react';
import './form.less';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import { Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm ,Radio,Modal} from 'antd';
import { Pagination } from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import address from './request/address.json';
import data from './request/data.json';
import CollectionCreateForm from './CustomizedForm';
import SureMessageForm from './SureMessage';
import ProveImgForm from './ProveImg';
import FormTable from './FormTable';
import config from '../config/config';
const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;
var RadioButton = Radio.Button;
var RadioGroup = Radio.Group;
var dataSourceAll = []
var startTime1=''
var endTime1=''
var timeRange1=undefined
//数组中是否包含某项
function isContains(arr, item){
    arr.map(function (ar) {
        if(ar === item){
            return true;
        }
    });
    return false;
}
//找到对应元素的索引
function catchIndex(arr, key){ //获取INDEX
    arr.map(function (ar, index) {
        if(ar.key === key){
            return index;
        }
    });
    return 0;
}
//替换数组的对应项
function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.key === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}
var uid;
var authType;
export default class UForm extends Component{
    constructor(props) {
        super(props);
        if(sessionStorage.getItem("userName")==null){
            this.props.history.push('/eos_web_manage');
        }
        this.state = {
            total:0,
            size:10,
            userName: '',
            address: '',
            timeRange: '',
            startime:'',
            endtime:'',
            visible: false, //新建窗口隐藏
            dataSource: [],
            count: data.length,
            data:data,
            selectedRowKeys: [],
            tableRowKey: 0,
            isUpdate: false,
            isSure:false,
            loading: false,
            authRequest:true,
            passRequest:false,
            rejectRequest:false,
            imgSrc:'',
            imgVisible:false,
            key:'',
            auditstate:1,
            companyname:'',
            name:'',
            authType:"",
        };
    }

    componentDidMount(){
        this.getData();
    }

    getData = (type,offset,startTime,endTime,date) => {
        var params;

        if(type ==undefined || type==null){
            type=4
        }
        params = "?auditstatus="+type;
        if (offset ==undefined || offset == null){
            offset =0;
        }
        params =params+"&offset="+offset;
        if(startTime!=undefined &&startTime !=''&&startTime !=null){
            params =params+"&startTime="+startTime;
        }
        if(endTime!=undefined &&endTime !=''&&endTime !=null){
            params =params+"&endTime="+endTime;
        }
        axios.get(config.baseUrl+"authentication/v1/searchApply"+params,{headers:{"Content-Type":'application/json'}}).then(function (response){
            if(response.data.code==200&&response.data.success){
                var dataArr = response.data.data.auths;
                var totalCount = response.data.data.totalCount;
                var data =[];
                for(var i =0;i <dataArr.length;i++){
                    var user ={}
                    user.key = dataArr[i].uid;
                    user.committime=this.parseDate((dataArr[i].submitTime)*1000);
                    user.account = dataArr[i].uid;
                    user.name = dataArr[i].userInfoEntity.name;
                    if(dataArr[i].userInfoEntity.gender==0){
                        user.sex="男";
                    }
                    if(dataArr[i].userInfoEntity.gender==1){
                        user.sex="女";
                    }
                    user.companyname =dataArr[i].userInfoEntity.company;
                    user.position=dataArr[i].userInfoEntity.major;
                    user.provimg="https://sf.athena.pub/"+dataArr[i].pic;
                    user.auditman=dataArr[i].auditor;
                    user.audittime=this.parseDate(dataArr[i].auditTime);
                    data.push(user);
                }
                if(type !=undefined || type !=null){
                    if(type == 4){
                        if(date!=undefined){
                            this.setState({
                                total:totalCount,
                                dataSource: data,
                                loading:false,
                                authRequest:true,
                                passRequest:false,
                                rejectRequest:false,
                                auditstate:type,
                                timeRange:date
                            })
                        }else {
                            this.setState({
                                total:totalCount,
                                dataSource: data,
                                loading:false,
                                authRequest:true,
                                passRequest:false,
                                rejectRequest:false,
                                auditstate:type,
                            })
                        }

                    }
                    if(type == 1){
                        if(date!=undefined){
                            this.setState({
                                total:totalCount,
                                dataSource: data,
                                loading:false,
                                authRequest:false,
                                passRequest:true,
                                rejectRequest:false,
                                auditstate:type,
                                timeRange:date
                            })
                        }else {
                            this.setState({
                                total:totalCount,
                                dataSource: data,
                                loading:false,
                                authRequest:false,
                                passRequest:true,
                                rejectRequest:false,
                                auditstate:type,
                            })
                        }

                    }
                    if(type == 5){
                        if(date!=undefined){
                            this.setState({
                                total:totalCount,
                                dataSource: data,
                                loading:false,
                                authRequest:false,
                                passRequest:false,
                                rejectRequest:true,
                                auditstate:type,
                                timeRange:date
                            })
                        }else {
                            this.setState({
                                total:totalCount,
                                dataSource: data,
                                loading:false,
                                authRequest:false,
                                passRequest:false,
                                rejectRequest:true,
                                auditstate:type
                            })
                        }
                    }
                }else {
                    this.setState({
                        total:totalCount,
                        dataSource: data,
                        loading:false
                    })
                }
            }else {
                alert(response.data.msg);
            }
        }.bind(this)).catch(function (err) {
            console.log("err:"+err)
        })
    };

    parseDate = (timeStamp) =>{
        var date= new Date(timeStamp)
        var year =date.getFullYear()+ '-';
        var month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var day = date.getDate() + ' ';
        return year+month+day;
    }

    //查看图片
    // getImg = (value,name,companyname) => {
    //     axios.get('/data')
    //         .then(function (response) {
    //             // console.log(response.data);
    //             imgSrc = response.data;
    //             this.setState({
    //                 name:name,
    //                 companyname:companyname,
    //                 imgSrc:'imgSrc',
    //                 imgVisible:true
    //             })
    //         }.bind(this))
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // };

    onSearchUserState = (value,event) => {
        this.getData(value.target.value,undefined);
    };

    RangePicker_Select = (date, dateString) => {
        console.log(date, dateString);
        const { dataSource,auditstate} = this.state;
        const startime = dateString[0];
        const endtime = dateString[1];
        if(date.length>0){
            startTime1=startime;
            endTime1=endtime;
            this.getData(auditstate,0,startime,endtime,date);
        }

    };
    saveFormRef = (form) => {
        this.form = form;
    };
    //提交认证信息
    handleCreate = (uid,type,passType) => {
        var auth;
        var that = this;
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== this.state.key)});
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");
            var coment = values.name;
            var name =localStorage.getItem("userName");
            var params ="?uid="+uid+"&name="+name;
            if(type =="pass"){
                params=params+"&type="+passType+"&coment="+coment;
            }
            if(type =="reject"){
                auth =5;
                params=params+"&type="+auth+"&rejectreason="+coment;
            }
            axios.get(config.baseUrl+"authentication/v1/updateApply"+params,{headers:{"Content-Type":"application/json"}}).then(function (res) {
                if (res.data.code == 200 && res.data.success){
                    that.getData(4,0)
                }else {
                    alert(res.data.msg);
                }
            }).catch(function (err) {
                console.log("err"+err);
            })
            form.resetFields();
            this.setState({
                visible: false,
            });
        });
    };
    //取消认证信息
    handleCancel = () => {
        const form=this.form;
        this.setState({ visible: false });
        form.resetFields();
    };
    //查看图片
    getImg = (value,name,companyname,provImg) => {
        this.setState({
            name:name,
            companyname:companyname,
            imgSrc:provImg,
            imgVisible:true
        })
    };
    //收回图片
    handleCancelImg=()=>{
        this.setState({ imgVisible: false });
    }
    onDelete = (key,type) => {
        uid = key;
        authType = type
        this.setState({
            visible: true,
            authType:type,
        })
    };
    //审核通过
    onResolve = (key,auditstate) => {
        this.setState({
            visible: true,
            key:key,
        })

    };
    //审核未通过
    onReject = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        //审核时间
       /* var provDate=moment().format("YYYY-MM-DD hh:mm:ss");
        axios.get('/data')
            .then(function (response) {
                this.setState({
                    dataSource:response.data

                });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });*/
    };
    //点击修改
    editClick = (key) => {
        const form = this.form;
        const { dataSource } = this.state;
        const index = catchIndex(dataSource, key);
        form.setFieldsValue({
            key: key,
            name: dataSource[index].name,
            sex: dataSource[index].sex,
            age: dataSource[index].age,
            address: dataSource[index].address.split(' / '),
            phone: dataSource[index].phone,
            email: dataSource[index].email,
            website: dataSource[index].website,
        });
        this.setState({
            visible: true,
            tableRowKey: key,
            isUpdate: true,
        });
    };
    //更新修改
    handleUpdate = () => {
        const form = this.form;
        const { dataSource, tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.key = tableRowKey;
            values.address = values.address.join(" / ");
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            form.resetFields();
            this.setState({
                visible: false,
                dataSource: replace(dataSource, tableRowKey, values)
            });
        });
    };
    //单选框改变选择
    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    pageChange=(current, pageSize)=>{
        const {auditstate}=this.state;
        this.getData(auditstate,current-1)
    };
    getApplys =(type)=>{
        if("auth" == type){
            this.setState({
                timeRange:''
            })
            this.getData(4,0)
        }
        if("pass" == type){
            this.setState({
                timeRange:''
            })
            this.getData(1,0)
        }
        if("reject" == type){
            this.setState({
                timeRange:''
            })
            this.getData(5,0)
        }
    }
    loginOut = () =>{
        localStorage.removeItem("userName");
        this.props.history.push('/eos_web_manage');
    }

    render(){
        const {total,authType, size,authRequest, passRequest,rejectRequest, address, timeRange, dataSource, visible, isUpdate, loading,imgSrc,name,companyname,imgVisible } = this.state;
        let pagination = {
            total: total,
            defaultCurrent: 1,
            pageSize: size,
            hideOnSinglePage:false,
            showSizeChanger: false,
            style:{textAlign:"center",float:"none"},
            onChange:(current, pageSize) => {
                this.pageChange(current, pageSize)
            },
           }
        const questiontxt = ()=>{
            return (
                <p>
                    <Icon type="plus-circle-o" /> : 新建信息<br/>
                    <Icon type="minus-circle-o" /> : 批量删除
                </p>
            )
        };
        return(
            <div>
                <div className='formBody'>
                    <Row gutter={24}>
                        <Col className="gutter-row" sm={24}>
                            <div style={{float:"right"}}>
                                {/*<span>欢迎<span style={{color:'#108ee9'}}>{localStorage.getItem("userName")}</span>,</span>*/}
                                <a onClick={this.loginOut}>退出登陆</a>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col className="gutter-row" sm={8}>
                            <div style={{display:"flex"}}>
                                {this.state.authRequest?
                                    <div onClick={()=>{this.getApplys("auth")}} style={{backgroundColor:"#bfbfbf",lineHeight:"20px",fontSize:"12px",border:"1px solid #bfbfbf",height:24,minWidth:94,width:94,padding:"0px 16px",fontWeight:500}}>
                                        待审核请求
                                    </div>
                                    :
                                    <div onClick={()=>{this.getApplys("auth")}} style={{lineHeight:"20px",fontSize:"12px",border:"1px solid #ddd",height:24,minWidth:94,width:94,padding:"0px 16px",fontWeight:500}}>
                                        待审核请求
                                    </div>
                                }
                                {this.state.passRequest?
                                    <div onClick={()=>{this.getApplys("pass")}} style={{backgroundColor:"#bfbfbf",lineHeight:"20px",fontSize:"12px",border:"1px solid #bfbfbf",height:24,minWidth:94,width:94,padding:"0px 16px",fontWeight:500}}>
                                        已通过请求
                                    </div>
                                    :
                                    <div onClick={()=>{this.getApplys("pass")}} style={{lineHeight:"20px",fontSize:"12px",border:"1px solid #ddd",height:24,minWidth:94,width:94,padding:"0px 16px",fontWeight:500}}>
                                        已通过请求
                                    </div>
                                }
                                {this.state.rejectRequest?
                                    <div onClick={()=>{this.getApplys("reject")}} style={{backgroundColor:"#bfbfbf",lineHeight:"20px",fontSize:"12px",border:"1px solid #bfbfbf",height:24,minWidth:94,width:94,padding:"0px 16px",fontWeight:500}}>
                                        已拒绝请求
                                    </div>
                                    :
                                    <div onClick={()=>{this.getApplys("reject")}} style={{lineHeight:"20px",fontSize:"12px",border:"1px solid #ddd",height:24,minWidth:94,width:94,padding:"0px 16px",fontWeight:500}}>
                                        已拒绝请求
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col className="gutter-row" sm={8}>
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <RangePicker style={{ width:'100%' }} onChange={this.RangePicker_Select} value={timeRange}/>
                        </Col>
                    </Row>
                    <FormTable
                        getImg={this.getImg}
                        authRequest={authRequest}
                        passRequest={passRequest}
                        rejectRequest={rejectRequest}
                        dataSource={dataSource}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        onResolve={this.onResolve}
                        onReject={this.onReject}
                        editClick={this.editClick}
                        loading={loading}
                        pagination={pagination}
                    />
                    {<SureMessageForm authType={authType} ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={(passType)=>this.handleCreate(uid,authType,passType)}  title="确认信息" okText="提交"/>}
                    {<ProveImgForm  visible={imgVisible} onCancel={this.handleCancelImg}  imgSrc={imgSrc} name={name} companyname={companyname} title="证明图片" />}
                </div>
            </div>
        )
    }
}