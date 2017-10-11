/**
 * Created by Aus on 2017/7/27.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {Checkbox} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class CheckboxPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: {required: true, labelName: '单选', value: ['cherry']},
            value2: {required: true, readOnly: true, labelName: '整个readonly', value: ['apple', 'banana', 'cherry', 'date']}
        };
    }
    handleChange (type, value) {
        this.setState((previousState)=>{
            previousState[type] = Object.assign(previousState[type], value);
            return {...previousState}
        });
    }
    render () {
        const {value1, value2} = this.state;
        const options1 = [
            {label: '苹果', value: 'apple'}, {label: '香蕉', value: 'banana'},
            {label: '樱桃', value: 'cherry', disabled: true}, {label: '枣', value: 'date'}
        ];

        return (
            <div className="page checkbox">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    Checkbox
                </h1>

                <ListTitle title="普通" />
                <div className='zby-form-box'>
                    <Checkbox
                        options={options1}
                        {...value1}
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <Checkbox
                        options={options1}
                        {...value2}
                    />
                </div>
            </div>
        )
    }
}

export default CheckboxPage