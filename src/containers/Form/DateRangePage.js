/**
 * Created by Aus on 2017/7/25.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {DateRange} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class DataRangePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: {required: true, startLabelName: '开始时间啊', startValue: '2017-06-21 12:00', endLabelName: '结束时间啊', endValue: '2017-09-09 12:00', rangeLabelName: 'ok', rangeValue: '1920小时0分钟（80天）'},
            value2: {required: false, readOnly: true, startLabelName: 'start', startValue: '2017-06-21 12:00', endLabelName: 'end', endValue: '2017-09-09 12:00', rangeLabelName: 'range', rangeValue: '1920小时0分钟（80天）'},
        };
    }
    handleChange (type, value) {
        this.setState((previousState)=>{
            previousState[type] = Object.assign(previousState[type], value);
            return {...previousState};
        });
    }
    render () {
        const {value1, value2} = this.state;

        return (
            <div className="page date-range">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    DateRange
                </h1>

                <ListTitle title="普通" />
                <div className='zby-form-box'>
                    <DateRange
                        {...value1}
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                </div>
                <ListTitle title="readonly" />
                <div className='zby-form-box'>
                    <DateRange
                        {...value2}
                    />
                </div>
            </div>
        )
    }
}

export default DataRangePage