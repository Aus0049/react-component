/**
 * Created by Aus on 2017/7/25.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {DateRange} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'
import moment from 'moment'

class DataRangePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: {required: true, startLabelName: '开始时间啊', startValue: moment([2017, 6, 27]), endLabelName: '结束时间啊', endValue: moment([2017, 6, 27]), rangeLabelName: '时长'},
            value2: {required: false, startLabelName: 'start', startValue: moment([2017, 6, 27, 19, 20]), endLabelName: 'end', endValue: moment([2017, 6, 27, 19, 30]), rangeLabelName: 'range', kind: 'datetime'},
            value3: {readOnly: true, required: false, startLabelName: '开始时间啊', startValue: moment([2017, 6, 27]), endLabelName: '结束时间啊', endValue: moment([2017, 6, 27]), rangeLabelName: '时长'},
            value4: {readOnly: true, required: false, startLabelName: 'start', startValue: moment([2017, 6, 27, 19, 20]), endLabelName: 'end', endValue: moment([2017, 6, 27, 19, 30]), rangeLabelName: 'range', kind: 'datetime'},
            value5: {required: true, startLabelName: '自定义开始', startValue: moment([2017, 6, 27]), endLabelName: '自定义结束', endValue: moment([2017, 6, 27]), rangeLabelName: '自定义时长'},
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
                    DateRange
                </h1>

                <ListTitle title="普通" />
                <div className='zby-form-box'>
                    <DateRange
                        {...value1}
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <DateRange
                        {...value2}
                        onChange={this.handleChange.bind(this, 'value2')}
                    />
                </div>
                <ListTitle title="readOnly" />
                <div className='zby-form-box'>
                    <DateRange
                        {...value3}
                    />
                    <DateRange
                        {...value4}
                    />
                </div>
                <ListTitle title="自定义" />
                <div className='zby-form-box'>
                    <DateRange
                        {...value5}
                        format={(d, h, m)=>(`${d}天${h}时${m}分`)}
                        onChange={this.handleChange.bind(this, 'value5')}
                    />
                </div>
            </div>
        )
    }
}

export default DataRangePage