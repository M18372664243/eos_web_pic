import React, { Component } from 'react';
import { Table, Icon,Button} from 'antd';
import moment from 'moment';
import { Upload, message } from 'antd';
import config from '../config/config';
export default class FormTable extends Component{
    constructor(props){
        super(props);
        this.state={
            auth:true,
            pass:false,
            upImg:{}
        }
    }
    setS=(pic)=>{
        this.setState({
            upImg:pic
        })
    }

    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({ selectedRowKeys });
    }
    render(){
        const {auth,checkChange, onPass,onUp, pagination, dataSource, loading ,relo,type,onPassNotice} = this.props;
        var {upImg}=this.state;
        const rowSelection = {
            onChange: checkChange,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
            }),
        };
        var columns=[];
        switch(type){
            case "pic":
                columns=[
                {
                    title: '图片ID',
                    dataIndex: 'id',
                    width:120,
                }, {
                    title: '图片名',
                    dataIndex: 'name',
                    width:80,
                    render:(text, record) =>
                        (<a href={record.icon} target="view_window">{record.name}</a>)
                },{
                    title: '图片链接',
                    dataIndex: 'link',
                    width: 80,
                }, {
                    title: '链接类型',
                    dataIndex: 'linktype',
                    width: 70,
                }, {
                    title: '图片',
                    dataIndex: 'icon',
                    width: 70,
                },{
                    title: '序列',
                    dataIndex: 'seq',
                    width: 70,
                },{
                    title: '更换图片',
                    dataIndex: 'opera',
                    width:80,
                    className:'imgtd',

                    render:(text, record) =>
                        <div className='opera'>
                            {/*<div style={{textAlign:"center",width:"100%"}}>
                                <Upload  {...props}>
                                    <Button >
                                        <Icon type="upload" /> 上传图片
                                    </Button>
                                </Upload>
                            </div>*/}
                            <div style={{textAlign:"center",width:"100%"}}>
                                <Button type="default" onClick={() => onPass(record.id,record.name,record.link,record.linktype,record.icon,type)} style={{width:'40%'}}>
                                    修改
                                </Button>
                            </div>
                        </div>
                }];break;
            case "dapps":
                columns=[
                    {
                        title: 'dappID',
                        dataIndex: 'id',
                        width:120,
                    }, {
                        title: 'dapp名',
                        dataIndex: 'name',
                        width:80,
                        render:(text, record) =>
                            (<a href={record.icon} target="view_window">{record.name}</a>)
                    },{
                        title: 'dapp链接',
                        dataIndex: 'link',
                        width: 80,
                    },{
                        title: '图标',
                        dataIndex: 'icon',
                        width: 70,
                    },{
                        title: '序列',
                        dataIndex: 'seq',
                        width: 70,
                    },{
                        title: '更换图标',
                        dataIndex: 'opera',
                        width:80,
                        className:'imgtd',

                        render:(text, record) =>
                            <div className='opera'>
                                {/*<div style={{textAlign:"center",width:"100%"}}>
                                <Upload  {...props}>
                                    <Button >
                                        <Icon type="upload" /> 上传图片
                                    </Button>
                                </Upload>
                            </div>*/}
                                <div style={{textAlign:"center",width:"100%"}}>
                                    <Button type="default" onClick={() => onPass(record.id,record.name,record.link,"",record.icon,type)} style={{width:'40%'}}>
                                        修改
                                    </Button>
                                </div>
                            </div>
                    }];break;
            case "groups":
                columns=[
                    {
                        title: '图片ID',
                        dataIndex: 'id',
                        width:120,
                    }, {
                        title: '图片名',
                        dataIndex: 'name',
                        width:80,
                        render:(text, record) =>
                            (<a href={"http://xs.athena.pub/images/groups/"+record.icon} target="view_window">{record.name}</a>)
                    },{
                        title: '图片链接',
                        dataIndex: 'link',
                        width: 80,
                    },{
                        title: '图标',
                        dataIndex: 'icon',
                        width: 70,
                    },{
                        title: '序列',
                        dataIndex: 'seq',
                        width: 70,
                    },{
                        title: '更换图标',
                        dataIndex: 'opera',
                        width:80,
                        className:'imgtd',

                        render:(text, record) =>
                            <div className='opera'>
                                {/*<div style={{textAlign:"center",width:"100%"}}>
                                <Upload  {...props}>
                                    <Button >
                                        <Icon type="upload" /> 上传图片
                                    </Button>
                                </Upload>
                            </div>*/}
                                <div style={{textAlign:"center",width:"100%"}}>
                                    <Button type="default" onClick={() => onPass(record.id,record.name,record.link,"",record.icon,type)} style={{width:'40%'}}>
                                        修改
                                    </Button>
                                </div>
                            </div>
                    }];break;
            case "dappswx":
                columns=[
                    {
                        title: '图片ID',
                        dataIndex: 'id',
                        width:120,
                    }, {
                        title: '图片名',
                        dataIndex: 'name',
                        width:80,
                        render:(text, record) =>
                            (<a href={record.icon} target="view_window">{record.name}</a>)
                    },{
                        title: '图片链接',
                        dataIndex: 'link',
                        width: 80,
                    },{
                        title: '图标',
                        dataIndex: 'icon',
                        width: 70,
                    },{
                        title: '序列',
                        dataIndex: 'seq',
                        width: 70,
                    },{
                        title: '更换图标',
                        dataIndex: 'opera',
                        width:80,
                        className:'imgtd',

                        render:(text, record) =>
                            <div className='opera'>
                                {/*<div style={{textAlign:"center",width:"100%"}}>
                                <Upload  {...props}>
                                    <Button >
                                        <Icon type="upload" /> 上传图片
                                    </Button>
                                </Upload>
                            </div>*/}
                                <div style={{textAlign:"center",width:"100%"}}>
                                    <Button type="default" onClick={() => onPass(record.id,record.name,record.link,"",record.icon,type)} style={{width:'40%'}}>
                                        修改
                                    </Button>
                                </div>
                            </div>
                    }];break;
            case "notice":
                columns=[
                    {
                        title: '公告ID',
                        dataIndex: 'id',
                        width:120,
                    }, {
                        title: '公告内容',
                        dataIndex: 'content',
                        width:80,
                    },{
                        title: '图片链接',
                        dataIndex: 'link',
                        width: 80,
                    },{
                        title: '公告类型',
                        dataIndex: 'noticetype',
                        width: 70,
                    },{
                        title: '创建时间',
                        dataIndex: 'timestamp',
                        width: 70,
                    },{
                        title: '更换公告',
                        dataIndex: 'opera',
                        width:80,
                        className:'imgtd',

                        render:(text, record) =>
                            <div className='opera'>
                                {/*<div style={{textAlign:"center",width:"100%"}}>
                                <Upload  {...props}>
                                    <Button >
                                        <Icon type="upload" /> 上传图片
                                    </Button>
                                </Upload>
                            </div>*/}
                                <div style={{textAlign:"center",width:"100%"}}>
                                    <Button type="default" onClick={() => onPassNotice(record.id,record.content,record.link,record.noticetype,record.timestamp,type)} style={{width:'40%'}}>
                                        修改
                                    </Button>
                                </div>
                            </div>
                    }];break;
        }

        // if(auth){
        //     columns=[
        //         {
        //             title: '用户ID',
        //             dataIndex: 'uid',
        //             width:120,
        //         }, {
        //             title: '用户名',
        //             dataIndex: 'name',
        //             width:80,
        //         },{
        //             title: '公司名+职位',
        //             dataIndex: 'CompanyAndPosition',
        //             width: 80,
        //         }, {
        //             title: '认可数',
        //             dataIndex: 'tagTimes',
        //             width: 70,
        //         }, {
        //             title: '审核操作',
        //             dataIndex: 'opera',
        //             width:80,
        //             className:'imgtd',
        //             render:(text, record) =>
        //                 <div className='opera'>
        //                     <div style={{textAlign:"center",width:"100%"}}>
        //                             <Button type="default" onClick={() => onPass(record.key,record.company,record.position,record.tagTimes,record.name)} style={{width:'40%'}}>
        //                                 通过
        //                             </Button>
        //                     </div>
        //                 </div>
        //
        //         }]
        //     columns=[
        //         {
        //             title: '图片ID',
        //             dataIndex: 'id',
        //             width:120,
        //         }, {
        //             title: '图片名',
        //             dataIndex: 'name',
        //             width:80,
        //             render:(text, record) =>
        //                 (<a href={"file:///"+record.icon} target="view_window">{record.name}</a>)
        //         },{
        //             title: '图片链接',
        //             dataIndex: 'link',
        //             width: 80,
        //         }, {
        //             title: '链接类型',
        //             dataIndex: 'linktype',
        //             width: 70,
        //         }, {
        //             title: '图片',
        //             dataIndex: 'icon',
        //             width: 70,
        //         },{
        //             title: '序列',
        //             dataIndex: 'seq',
        //             width: 70,
        //         },{
        //             title: '更换图片',
        //             dataIndex: 'opera',
        //             width:80,
        //             className:'imgtd',
        //
        //             render:(text, record) =>
        //                 <div className='opera'>
        //                     {/*<div style={{textAlign:"center",width:"100%"}}>
        //                         <Upload  {...props}>
        //                             <Button >
        //                                 <Icon type="upload" /> 上传图片
        //                             </Button>
        //                         </Upload>
        //                     </div>*/}
        //                     <div style={{textAlign:"center",width:"100%"}}>
        //                         <Button type="default" onClick={() => onPass(record.id,record.name,record.link,record.linktype,record.icon)} style={{width:'40%'}}>
        //                             修改
        //                         </Button>
        //                     </div>
        //                 </div>
        //         }]
        // }else {
        //     columns=[
        //         {
        //             title: '审核人员ID',
        //             dataIndex: 'authId',
        //             width:120,
        //         }, {
        //             title: '审核时间',
        //             dataIndex: 'authTime',
        //             width:80,
        //         },{
        //             title: '用户ID',
        //             dataIndex: 'uid',
        //             width:120,
        //         }, {
        //             title: '用户名',
        //             dataIndex: 'name',
        //             width:80,
        //         },{
        //             title: '公司名+职位',
        //             dataIndex: 'CompanyAndPosition',
        //             width: 80,
        //         }]
        // }
        // if(authRequest){
        //     columns=[
        //         {
        //             title: '提交时间',
        //             dataIndex: 'committime',
        //             sorter: (a, b) => moment(a.committime) - moment(b.committime),
        //             width:120,
        //         }, {
        //             title: '账号',
        //             dataIndex: 'account',
        //             sorter: (a, b) => moment(a.account) - moment(b.account),
        //             width:80,
        //         },{
        //             title: '姓名',
        //             dataIndex: 'name',
        //             width: 80,
        //         }, {
        //             title: '性别',
        //             dataIndex: 'sex',
        //             // filters: [
        //             //     { text: '男', value: '男' },
        //             //     { text: '女', value: '女' },
        //             // ],
        //             // onFilter: (value, record) => record.sex.indexOf(value) === 0,
        //             width: 70,
        //         }, {
        //             title: '公司名',
        //             dataIndex: 'companyname',
        //             width: 100,
        //         },{
        //             title: '职位',
        //             dataIndex: 'position',
        //             width: 100,
        //         }, {
        //             title: '证明图片',
        //             dataIndex: 'provimg',
        //             width: 80,
        //             className:'imgtd',
        //             render:(text, record) =>
        //                 <Button type="primary" onClick={() => getImg(record.key,record.name,record.companyname,record.provimg)}>查看图片</Button>
        //         },{
        //             title: '审核操作',
        //             dataIndex: 'opera',
        //             width:80,
        //             className:'imgtd',
        //             render:(text, record) =>
        //                 <div className='opera'>
        //                     <div style={{display:"flex",width:"100%"}}>
        //                         <div style={{width:"50%"}}>
        //                             <Button type="default" onClick={() => onDelete(record.key,"pass")}>
        //                                 通过
        //                             </Button>
        //                         </div>
        //                         <div style={{width:"50%"}}>
        //                             <Button type="default" onClick={() => onDelete(record.key,"reject")}>
        //                                 拒绝
        //                             </Button>
        //                         </div>
        //                     </div>
        //                 </div>
        //
        //         }]
        // }else if(passRequest || rejectRequest){
        //     columns=[
        //         {
        //             title: '提交时间',
        //             dataIndex: 'committime',
        //             sorter: (a, b) => moment(a.committime) - moment(b.committime),
        //             width:120,
        //         }, {
        //             title: '账号',
        //             dataIndex: 'account',
        //             sorter: (a, b) => moment(a.account) - moment(b.account),
        //             width:80,
        //         },{
        //             title: '姓名',
        //             dataIndex: 'name',
        //             width: 80,
        //         }, {
        //             title: '性别',
        //             dataIndex: 'sex',
        //             // filters: [
        //             //     { text: '男', value: '男' },
        //             //     { text: '女', value: '女' },
        //             // ],
        //             // onFilter: (value, record) => record.sex.indexOf(value) === 0,
        //             width: 70,
        //         }, {
        //             title: '公司名',
        //             dataIndex: 'companyname',
        //             width: 100,
        //         },{
        //             title: '职位',
        //             dataIndex: 'position',
        //             width: 100,
        //         }, {
        //             title: '证明图片',
        //             dataIndex: 'provimg',
        //             width:80,
        //
        //             className:'imgtd',
        //             render:(text, record) =>
        //                 <Button type="primary" onClick={() => getImg(record.key,record.name,record.companyname,record.provimg)}>查看图片</Button>
        //         },{
        //             title: '审核人',
        //             dataIndex: 'auditman',
        //             width: 100,
        //         },{
        //             title: '审核时间',
        //             dataIndex: 'audittime',
        //             width: 120,
        //         }]
        // }
        return(
            <Table
                onPass = {onPass}
                columns={columns}
                dataSource={dataSource}
                bordered={true}
                scroll={{x:'100%'}}
                className='formTable'
                loading={loading}
                scroll={{ x: 1000 }}
                pagination={pagination}
                onRow={(record) => ({
                    onClick: () => {
                        this.selectRow(record);
                    },
                })}
            />
        )
    }
}