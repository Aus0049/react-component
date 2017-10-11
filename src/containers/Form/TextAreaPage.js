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
            value1: '一二三四五六七八九十一二三四五六七八九十',
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
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    Input
                </h1>

                <ListTitle title="普通" />

                <div className='zby-form-box'>
                    <TextArea
labelName="受控组件" value={value1}
required placeHolder="受控组件"
onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <TextArea
labelName="不受控组件" value={value2}
placeHolder="不受控组件" controlled={false}
                    />
                    <TextArea
labelName="readOnly" value={value3}
readOnly placeHolder="readOnly"
                    />
                </div>
            </div>
        )
    }
}

export default TextAreaPage