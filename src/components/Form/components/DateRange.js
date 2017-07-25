/**
 * Created by Aus on 2017/7/24.
 */
import React from 'react'
import classNames from 'classnames'
import DatePicker from '../../DataEntry/DataPicker/'
import List from '../../DataDisplay/List/'
import moment from 'moment'
import '../style/index.scss'

const DateRange = (props) => {
    const {required, startLabelName, endLabelName, readOnly, rangeLabelName, rangeValue, onChange} = props;
    const {startValue, endValue} = props;

    const [startDate, startTime] = startValue.split(' ');
    const [endDate, endTime] = endValue.split(' ');
    const datetimeDOM = [];

    function handleChange(from, type, value) {
        const data = {startValue: startValue, endValue: endValue, rangeValue: undefined};

        if('date' === type){
            if('start' === from){
                data.startValue = `${value.format('YYYY-MM-DD')} ${startValue.split(' ')[1]}`;
            } else {
                data.endValue = `${value.format('YYYY-MM-DD')} ${endValue.split(' ')[1]}`;
            }

        } else if ('time' === type) {
            if('start' === from){
                data.startValue = `${startValue.split(' ')[0]} ${value.format('HH:mm')}`;
            } else {
                data.endValue = `${endValue.split(' ')[0]} ${value.format('HH:mm')}`;
            }

        } else if ('day' === type) {
            if('start' === from){
                data.startValue = `${startValue.split(' ')[0]} ${value[0]}`;
            } else {
                data.endValue = `${endValue.split(' ')[0]} ${value[0]}`;
            }

        }

        const startMoment = moment(data.startValue, 'YYYY-MM-DD HH:mm');
        const endMoment = moment(data.endValue, 'YYYY-MM-DD HH:mm');
        // 时间差毫秒数
        const diff = endMoment.diff(startMoment);
        // 天数 做两位小数处理
        const days = Number.parseInt(endMoment.diff(startMoment, 'days', true) * 100) / 100;
        // 小时 做两位小数处理
        const hours = Number.parseInt(diff / (1000 * 60 * 60));
        // 分钟 做两位小数处理
        const minutes = (diff % (1000 * 60 * 60)) / (1000 * 60) ;

        data.rangeValue = `${hours} 小时 ${minutes} 分钟 (${days} 天)`;

        onChange(data);
    }

    // 开始时间
    datetimeDOM.push(
        <div className="content">
            <div className="connection date">
                {readOnly ?
                    <p className="input-readonly">{startDate}</p>
                    :
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        value={moment(startDate, 'YYYY-MM-DD')}
                        onChange={handleChange.bind(undefined, 'start', 'date')}
                    >
                        <List.Item className="ant-input-value inline" icon="vertical">{startDate}</List.Item>
                    </DatePicker>}
            </div>
            <div className="connection time">
                {
                    readOnly ?
                        <p className="input-readonly">{startTime}</p>
                        :
                        <DatePicker
                            mode="time"
                            title="选择时间"
                            value={moment(startTime, 'HH:mm')}
                            onChange={handleChange.bind(undefined, 'start', 'time')}
                        >
                            <List.Item className="ant-input-value inline" icon="vertical">{startTime}</List.Item>
                        </DatePicker>
                }
            </div>
        </div>
    );

    // 结束时间
    datetimeDOM.push(
        <div className="content">
            <div className="connection date">
                {readOnly ?
                    <p className="input-readonly">{endDate}</p>
                    :
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        value={moment(endDate, 'YYYY-MM-DD')}
                        onChange={handleChange.bind(undefined, 'end', 'date')}
                    >
                        <List.Item className="ant-input-value inline" icon="vertical">{endDate}</List.Item>
                    </DatePicker>}
            </div>
            <div className="connection time">
                {readOnly ?
                        <p className="input-readonly">{endTime}</p>
                        :
                        <DatePicker
                            mode="time"
                            title="选择时间"
                            value={moment(endTime, 'HH:mm')}
                            onChange={handleChange.bind(undefined, 'end', 'time')}
                        >
                            <List.Item className="ant-input-value inline" icon="vertical">{endTime}</List.Item>
                        </DatePicker>
                }
            </div>
        </div>
    );

    return (
        <div className="form-date-range-box">

            <div className="zby-form-line-box select">
                <div className="title">
                    <i className={classNames(['fa', 'fa-asterisk', {required: required}])}></i>
                    <div className="label-name">{startLabelName}</div>
                </div>
                {datetimeDOM[0]}
            </div>

            <div className="zby-form-line-box select">
                <div className="title">
                    <i className={classNames(['fa', 'fa-asterisk', {required: required}])}></i>
                    <div className="label-name">{endLabelName}</div>
                </div>
                {datetimeDOM[1]}
            </div>

            <div className="zby-form-line-box select">
                <div className="title">
                    <i className={classNames(['fa', 'fa-asterisk', {required: required}])}></i>
                    <div className="label-name">{rangeLabelName}</div>
                </div>
                <div className="content">
                    <p className="input-readonly">{rangeValue}</p>
                </div>
            </div>

        </div>
    )
};

function empty() {}

DateRange.PropTypes = {
    required: React.PropTypes.bool,
    startLabelName: React.PropTypes.string.isRequired,
    startValue: React.PropTypes.string,
    endLabelName: React.PropTypes.string.isRequired,
    endValue: React.PropTypes.string,
    rangeLabelName: React.PropTypes.string.isRequired,
    rangeValue: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

DateRange.defaultProps = {
    required: false,
    readOnly: false,
    onChange: empty
};

export default DateRange;