/**
 * Created by Aus on 2017/7/17.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {Input} from '../../components/Form/'

import Tools from '../../components/Tools/Tools'

class InputPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: "abc"
        };
    }
    handleChange (type, e) {
        const value = e.target.value;

        this.setState({
            [type]: value
        });
    }
    render () {
        const {value1} = this.state;

        return (
            <div className="page input">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Input
                </h1>

                <ListTitle title="普通" />

                <div className='zby-form-box'>
                    <Input labelName="受控组件" value={value1} required placeHolder="受控组件" onChange={this.handleChange.bind(this, 'value1')} />
                </div>
            </div>
        )
    }
}

export default InputPage