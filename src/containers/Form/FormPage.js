/**
 * Created by Aus on 2017/8/1.
 */
import React from 'react'
import {Form} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'
import Button from '../../components/DataEntry/Button'
import Toast from '../../components/Feedback/Toast/components/Toast'
import moment from 'moment'

class FormPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            formData: [
                {type: 'group', id: 'customGroup', name: '自定义表单', children: [
                    {type: 'input', id: 'username', labelName: '姓名', value: 'Aus', require: true, max: 10, min: 2},
                    {type: 'input', id: 'password', labelName: '密码', value: 'asd', kind: 'password', require: true, min: 4},
                    {type: 'input', id: 're-password', labelName: '重复密码', value: 'as', kind: 'password', require: true, min: 4},
                    {type: 'select', id: 'gender', labelName: '性别', value: '1', data: [{label: '男', value: '1'}, {label: '女', value: '2'}, {label: '外星人', value: '3'}]},
                    {type: 'date-time', id: 'datetime', labelName: '出生日期', value: moment()},
                    {type: 'input', id: 'email', labelName: '邮箱', value: undefined, kind: 'email', placeholder: '请输入邮箱'},
                    {type: 'input', id: 'phone', labelName: '手机号', value: undefined, kind: 'phone', placeholder: '请输入手机号'},
                    {type: 'switch', id: 'message', labelName: '开启消息推送', value: true},
                    {type: 'checkbox', id: 'specialty', labelName: '擅长语言', value: ['JS'], options: [{label: 'JS', value: 'JS'}, {label: 'JAVA', value: 'JAVA'}, {label: 'PHP', value: 'PHP'}, {label: 'C++', value: 'C++'}]},
                ]}
            ]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit () {
        const validateResult = this.refs.form.validate();

        if(validateResult.length === 0){
            Toast.success('提交成功！', 3000, 'fa-check', false);
            return;
        }
        Toast.error('提交失败！', 3000, 'fa-times', false);
    }
    render () {
        const {formData} = this.state;

        return (
            <div className="page form">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    Form
                </h1>

                <Form
                    ref="form"
                    data={formData}
                    onChange={(data)=>{console.log(data)}}
                />

                <div className="button-box">
                    <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                </div>

            </div>
        )
    }
}

export default FormPage