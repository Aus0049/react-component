/**
 * Created by Aus on 2017/11/28.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import {Input} from 'components/Form/'
import Tools from 'components/Tools/Tools'

class InputPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: 'abc',
            value2: 'ABC',
            value3: '一二三',
            value4: 'asd',
            value5: 33368,
            value6: 18686868686,
            value7: '123@1.com',
            value8: '获取焦点的时候Tooltip',
        };
    }
    handleChange (type, value) {
        this.setState({[type]: value.value});
    }
    render () {
        const {value1, value2, value3, value4, value5, value6, value7, value8} = this.state;

        return (
            <div className="page input">
                <h1 className="title">
                    <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                    Input
                </h1>

                <ListTitle title="普通" />
                <div className='zby-form-box'>
                    <Input
                        labelName="受控组件" value={value1}
                        required placeHolder="受控组件"
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <Input
                        labelName="不受控组件" value={value2}
                        placeHolder="不受控组件" controlled={false}
                    />
                    <Input
                        labelName="readOnly" value={value3}
                        readOnly placeHolder="readOnly"
                    />
                    <Input
                        labelName="操作反馈" value={value4}
                        placeHolder="操作反馈icon" controlled={false}
                        feedbackIcon='loading'
                    />
                </div>
                <ListTitle title="不同类型" />
                <div className='zby-form-box'>
                    <Input
                        labelName="密码" value={value5}
                        kind="password" placeHolder="password"
                        onChange={this.handleChange.bind(this, 'value5')}
                    />
                    <Input
                        labelName="手机号" value={value6}
                        kind="phone" placeHolder="phone"
                        onChange={this.handleChange.bind(this, 'value6')}
                    />
                    <Input
                        labelName="邮箱" value={value7}
                        kind="email" placeHolder="email"
                        onChange={this.handleChange.bind(this, 'value7')}
                    />
                </div>
                <ListTitle title="错误提示" />
                <div className='zby-form-box'>
                    <Input
                        labelName="报错提示" value={value8}
                        placeHolder="error" errorText="error"
                        onChange={this.handleChange.bind(this, 'value8')}
                    />
                </div>
            </div>
        )
    }
}

export default InputPage