/**
 * Created by Aus on 2017/7/31.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {Number} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class NumberPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: 12.2,
            value2: 100,
            value3: '一二三'
        };
    }
    handleChange (type, value) {
        this.setState({
            [type]: value.value
        });
    }
    render () {
        const {value1, value2, value3} = this.state;

        return (
            <div className="page number">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Number
                </h1>

                <ListTitle title="普通" />

                <div className='zby-form-box'>
                    <Number
                        required
                        labelName="数值"
                        value={value1}
                        placeHolder="请输入数值"
                        unit="%"
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <Number
                        readOnly
                        labelName="readOnly"
                        value={value2}
                        placeHolder="请输入数值"
                        unit="单位"
                    />
                </div>
            </div>
        )
    }
}

export default NumberPage
