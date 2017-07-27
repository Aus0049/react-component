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
            value1: {required: true, labelName: '单选', value: ['cherry']}
        };
    }
    handleChange (type, value) {
        this.setState({
            [type]: value
        });
    }
    render () {
        const {value1} = this.state;
        const options1 = [
            {label: '苹果', value: 'apple'}, {label: '香蕉', value: 'banana'},
            {label: '樱桃', value: 'cherry'}, {label: '枣', value: 'date', disabled: true}
        ];

        return (
            <div className="page checkbox">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Select
                </h1>

                <ListTitle title="普通" />
                <div className='zby-form-box'>
                    <Checkbox
                        options={options1}
                        {...value1}
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                </div>
            </div>
        )
    }
}

export default CheckboxPage