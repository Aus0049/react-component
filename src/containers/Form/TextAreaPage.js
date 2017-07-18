/**
 * Created by Aus on 2017/7/18.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {TextArea} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class TextAreaPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: 'abc',
            value2: 'ABC',
            value3: '一二三'
        };
    }
    handleChange (type, e) {
        const value = e.target.value;
        console.log({[type]: value});
        this.setState({
            [type]: value
        });
    }
    render () {
        const {value1, value2, value3} = this.state;

        return (
            <div className="page input">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Input
                </h1>

                <ListTitle title="普通" />

                <div className='zby-form-box'>

                </div>
            </div>
        )
    }
}

export default TextAreaPage