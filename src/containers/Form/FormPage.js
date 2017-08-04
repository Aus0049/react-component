/**
 * Created by Aus on 2017/8/1.
 */
import React from 'react'
import {Form, Validate} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class FormPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            formData: [
                {type: 'group', id: 'customGroup', name: '自定义表单', children: [
                    {type: 'input', id: 'username', labelName: '姓名', value: 'Aus', require: true, max: 10, min: 2},
                    {type: 'input', id: 'password', labelName: '密码', value: 'asdf1234', kind: 'password', require: true, min: 4},
                    {type: 'input', id: 're-password', labelName: '重复密码', value: 'asdf1234', kind: 'password', require: true, min: 4},
                    {type: 'select', id: 'gender', labelName: '性别', value: '1', data: [{label: '男', value: '1'}, {label: '女', value: '2'}, {label: '外星人', value: '3'}]},
                    {type: 'input', id: 'email', labelName: '邮箱', value: undefined, kind: 'email', placeholder: '请输入邮箱'},
                    {type: 'input', id: 'phone', labelName: '手机号', value: undefined, kind: 'phone', placeholder: '请输入手机号'},
                ]}
            ]
        }
    }
    render () {
        const {formData} = this.state;

        console.log(Validate([
            {id: '1', name: 'a', value: '', require: true},
            {id: '2', name: 'b', value: 'as1.2', type: 'email'},
            {id: '3', name: 'c', value: '19999123', type: 'phone'},
            {id: '4', name: 'd', value: 'asd', min: 4},
            {id: '5', name: 'd', value: 2, type: 'number', min: 5},
        ]));

        return (
            <div className="page form">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Form
                </h1>

                <Form
                    data={formData}
                >

                </Form>

            </div>
        )
    }
}

export default FormPage