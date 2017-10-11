/**
 * Created by Aus on 2017/7/26.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {DateTime} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'
import moment from 'moment'

class DateTimePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: {required: true, labelName: '日期', value: moment()},
            value2: {required: false, labelName: '日期时间', value: moment(), kind: 'datetime'},
            value3: {required: false, labelName: '日期时间', value: undefined, kind: 'datetime'},
            value4: {readOnly: true, required: false, labelName: '日期时间', value: moment(), kind: 'datetime'},
            value5: {readOnly: true, required: false, labelName: '日期时间', value: moment(), kind: 'datetime'},
        };
    }
    handleChange (type, value) {
        this.setState((previousState)=>{
            previousState[type] = Object.assign(previousState[type], value);
            return {...previousState};
        });
    }
    render () {
        const {value1, value2, value3, value4, value5} = this.state;

        return (
            <div className="page date-range">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    DateTime
                </h1>

                <ListTitle title="普通" />
                <div className='zby-form-box'>
                    <DateTime
                        {...value1}
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <DateTime
                        {...value2}
                        onChange={this.handleChange.bind(this, 'value2')}
                    />
                    <DateTime
                        {...value3}
                        onChange={this.handleChange.bind(this, 'value3')}
                    />
                </div>
                <ListTitle title="readonly" />
                <div className='zby-form-box'>
                    <DateTime
                        {...value4}
                    />
                    <DateTime
                        {...value5}
                    />
                </div>
            </div>
        )
    }
}

export default DateTimePage