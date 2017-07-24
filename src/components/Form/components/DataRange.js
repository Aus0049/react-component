/**
 * Created by Aus on 2017/7/24.
 */
import React from 'react'
import classNames from 'classnames'
import DatePicker from '../../DataEntry/DataPicker/'
import Picker from '../../DataEntry/Picker/'
import List from '../../DataDisplay/List/'
import moment from 'moment'
import '../style/index.scss'

const DateRange = (props) => {
    const timeData = [{label: "上半天", value: "00:00:00"}, {label: "下半天", value: "12:00:00"}];
    const {required, startLabelName, endLabelName, kind, readOnly, rangeLabelName, longValue, onChange} = props;
    const today = moment().format('YYYY-MM-DD');
    const now = moment().format('HH:mm');
    let {startValue, endValue} = props;

    // 初始化默认值
    if(!startValue){
        if(kind){
            startValue = today + ' 00:00:00';
        } else {
            startValue = today + ' ' + now;
        }
    }

    if(!endValue){
        if(kind){
            endValue = today + ' 00:00:00';
        } else {
            endValue = today + ' ' + now;
        }
    }

    const [startDate, startTime] = startValue.split(' ');
    const [endDate, endTime] = endValue.split(' ');
    const datetimeDOM = [];

    function handleChange(from, type, value) {
        const data = {startValue: startValue, endValue: endValue, longValue: undefined};

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

        data.longValue = `${hours} 小时 ${minutes} 分钟 (${days} 天)`;

        onChange(data);
    }

    // 开始时间
    datetimeDOM.push(
        <div className="content">
            <div className="connection date">
                <i className="icon icon-time"></i>
                {readOnly ?
                    <p className="input-readonly">{startDate}</p>
                    :
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        value={moment(startDate, 'YYYY-MM-DD')}
                        onChange={handleChange.bind(undefined, 'start', 'date')}
                    >
                        <List.Item arrow="down" className="ant-input-value inline">{startDate}</List.Item>
                    </DatePicker>}
            </div>
            <div className="connection time">
                {kind === 0 ?
                    readOnly ?
                        <p className="input-readonly">{startTime}</p>
                        :
                        <DatePicker
                            mode="time"
                            title="选择时间"
                            value={moment(startTime, 'HH:mm')}
                            onChange={handleChange.bind(undefined, 'start', 'time')}
                        >
                            <List.Item arrow="down" className="ant-input-value inline">{startTime}</List.Item>
                        </DatePicker>
                    :
                    readOnly ?
                        <p className="input-readonly">{startTime === "00:00:00" ? "上半天" : "下半天"}</p>
                        :
                        <Picker
                            data={timeData}
                            cols={1}
                            title="选择时间"
                            value={[startTime]}
                            onChange={handleChange.bind(undefined, 'start', 'day')}
                        >
                            <List.Item arrow="down" className="ant-input-value inline">{startTime === "00:00:00" ? "上半天" : "下半天"}</List.Item>
                        </Picker>}
            </div>
        </div>
    );

    // 结束时间
    datetimeDOM.push(
        <div className="content">
            <div className="connection date">
                <i className="icon icon-time"></i>
                {readOnly ?
                    <p className="input-readonly">{endDate}</p>
                    :
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        value={moment(endDate, 'YYYY-MM-DD')}
                        onChange={handleChange.bind(undefined, 'end', 'date')}
                    >
                        <List.Item arrow="down" className="ant-input-value inline">{endDate}</List.Item>
                    </DatePicker>}
            </div>
            <div className="connection time">
                {kind === 0 ?
                    readOnly ?
                        <p className="input-readonly">{endTime}</p>
                        :
                        <DatePicker
                            mode="time"
                            title="选择时间"
                            value={moment(endTime, 'HH:mm')}
                            onChange={handleChange.bind(undefined, 'end', 'time')}
                        >
                            <List.Item arrow="down" className="ant-input-value inline">{endTime}</List.Item>
                        </DatePicker>
                    :
                    readOnly ?
                        <p className="input-readonly">{endTime === "00:00:00" ? "上半天" : "下半天"}</p>
                        :
                        <Picker
                            data={timeData}
                            cols={1}
                            title="选择时间"
                            value={[endTime]}
                            onChange={handleChange.bind(undefined, 'end', 'day')}
                        >
                            <List.Item arrow="down" className="ant-input-value inline">{endTime === "00:00:00" ? "上半天" : "下半天"}</List.Item>
                        </Picker>}
            </div>
        </div>
    );

    return (
        <div className="form-date-range-box">

            <div className="form-line-box select">
                <div className="title">
                    <i className={classNames(['icon', 'icon-required', {required: required}])}></i>
                    <div className="label-name">{startLabelName}</div>
                </div>
                {datetimeDOM[0]}
            </div>

            <div className="form-line-box select">
                <div className="title">
                    <i className={classNames(['icon', 'icon-required', {required: required}])}></i>
                    <div className="label-name">{endLabelName}</div>
                </div>
                {datetimeDOM[1]}
            </div>

            <div className="form-line-box select">
                <div className="title">
                    <i className={classNames(['icon', 'icon-required', {required: required}])}></i>
                    <div className="label-name">{rangeLabelName}</div>
                </div>
                <div className="content">
                    <p className="input-readonly">{longValue}</p>
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
    longValue: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    kind: React.PropTypes.oneOf([0, 1]),
    onChange: React.PropTypes.func
};

DateRange.defaultProps = {
    required: false,
    readOnly: false,
    kind: 0,
    onChange: empty
};

export default DateRange;