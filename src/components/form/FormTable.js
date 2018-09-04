import React, { Component } from 'react';
import { Table, Icon,Button} from 'antd';
import moment from 'moment';

export default class FormTable extends Component{
    constructor(props){
        super(props);
        this.state={
            choose:true,
            rejectAuth:false,
            passAuth:false,
        }
    }

    componentDidMount(){

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
        const { authRequest,passRequest,rejectRequest,checkChange,onResolve,onReject,getImg, onDelete, editClick,pagination, dataSource, loading } = this.props;
        const rowSelection = {
            onChange: checkChange,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
            }),
        };
        var columns=[];
        if(authRequest){
            columns=[
                {
                    title: '提交时间',
                    dataIndex: 'committime',
                    sorter: (a, b) => moment(a.committime) - moment(b.committime),
                    width:120,
                }, {
                    title: '账号',
                    dataIndex: 'account',
                    sorter: (a, b) => moment(a.account) - moment(b.account),
                    width:80,
                },{
                    title: '姓名',
                    dataIndex: 'name',
                    width: 80,
                }, {
                    title: '性别',
                    dataIndex: 'sex',
                    // filters: [
                    //     { text: '男', value: '男' },
                    //     { text: '女', value: '女' },
                    // ],
                    // onFilter: (value, record) => record.sex.indexOf(value) === 0,
                    width: 70,
                }, {
                    title: '公司名',
                    dataIndex: 'companyname',
                    width: 100,
                },{
                    title: '职位',
                    dataIndex: 'position',
                    width: 100,
                }, {
                    title: '证明图片',
                    dataIndex: 'provimg',
                    width: 80,
                    className:'imgtd',
                    render:(text, record) =>
                        <Button type="primary" onClick={() => getImg(record.key,record.name,record.companyname,record.provimg)}>查看图片</Button>
                },{
                    title: '审核操作',
                    dataIndex: 'opera',
                    width:80,
                    className:'imgtd',
                    render:(text, record) =>
                        <div className='opera'>
                            <div style={{display:"flex",width:"100%"}}>
                                <div style={{width:"50%"}}>
                                    <Button type="default" onClick={() => onDelete(record.key,"pass")}>
                                        通过
                                    </Button>
                                </div>
                                <div style={{width:"50%"}}>
                                    <Button type="default" onClick={() => onDelete(record.key,"reject")}>
                                        拒绝
                                    </Button>
                                </div>
                            </div>
                        </div>

                }]
        }else if(passRequest || rejectRequest){
            columns=[
                {
                    title: '提交时间',
                    dataIndex: 'committime',
                    sorter: (a, b) => moment(a.committime) - moment(b.committime),
                    width:120,
                }, {
                    title: '账号',
                    dataIndex: 'account',
                    sorter: (a, b) => moment(a.account) - moment(b.account),
                    width:80,
                },{
                    title: '姓名',
                    dataIndex: 'name',
                    width: 80,
                }, {
                    title: '性别',
                    dataIndex: 'sex',
                    // filters: [
                    //     { text: '男', value: '男' },
                    //     { text: '女', value: '女' },
                    // ],
                    // onFilter: (value, record) => record.sex.indexOf(value) === 0,
                    width: 70,
                }, {
                    title: '公司名',
                    dataIndex: 'companyname',
                    width: 100,
                },{
                    title: '职位',
                    dataIndex: 'position',
                    width: 100,
                }, {
                    title: '证明图片',
                    dataIndex: 'provimg',
                    width:80,

                    className:'imgtd',
                    render:(text, record) =>
                        <Button type="primary" onClick={() => getImg(record.key,record.name,record.companyname,record.provimg)}>查看图片</Button>
                },{
                    title: '审核人',
                    dataIndex: 'auditman',
                    width: 100,
                },{
                    title: '审核时间',
                    dataIndex: 'audittime',
                    width: 120,
                }]
        }
        return(
            <Table
                /*rowSelection={rowSelection}*/
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