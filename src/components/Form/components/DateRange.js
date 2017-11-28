/**
 * Created by Aus on 2017/7/24.
 */
import React from 'react'
import classNames from 'classnames'
import DatePicker from '../../DataEntry/DataPicker/'
import List from '../../DataDisplay/List/'
import moment from 'moment'
import '../style/form.scss'

const DateRange = (props) => {
    const {required, startLabelName, endLabelName, startValue, endValue, readOnly, rangeLabelName, kind, format, onChange} = props;
    const datetimeDOM = [];
    let startValueText = <span>&nbsp;</span>, endValueText = <span>&nbsp;</span>;

    if(startValue){
        if(kind === 'date'){
            startValueText = startValue.format('YYYY-MM-DD');
        } else {
            startValueText = startValue.format('YYYY-MM-DD HH:mm');
        }
    }

    if(endValue){
        if(kind === 'date'){
            endValueText = endValue.format('YYYY-MM-DD');
        } else {
            endValueText = endValue.format('YYYY-MM-DD HH:mm');
        }
    }

    function handleChange(from, value) {
        const data = {startValue: startValue, endValue: endValue};
        data[from] = value;

        onChange(data);
    }

    if(startValue && endValue){
        // 时间差毫秒数
        const diff = endValue.diff(startValue);
        // 天数 做两位小数处理
        const days = Number.parseInt(endValue.diff(startValue, 'days', true) * 100) / 100;
        // 小时 做两位小数处理
        const hours = Number.parseInt(diff / (1000 * 60 * 60));
        // 分钟 做两位小数处理
        const minutes = Number.parseInt((diff % (1000 * 60 * 60)) / (1000 * 60) * 100) / 100;

        let text = `${hours} 小时 ${minutes} 分钟 (${days} 天)`;

        if(format){
            text = format(days, hours, minutes);
        }

        datetimeDOM.push(text);
    }

    return (
        <div className="form-date-range-box">

            <div className="zby-form-line-box select">
                <div className="title">
                    <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                    <div className="label-name">{startLabelName}</div>
                </div>
                <div className="content">
                    {readOnly ?
                        <p className="input-readonly">{startValueText}</p>
                        :
                        <DatePicker
                            mode={kind}
                            title="选择时间"
                            value={startValue}
                            onChange={handleChange.bind(undefined, 'startValue')}
                        >
                            <List.Item icon="vertical">{startValueText}</List.Item>
                        </DatePicker>
                    }
                </div>
            </div>

            <div className="zby-form-line-box select">
                <div className="title">
                    <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                    <div className="label-name">{endLabelName}</div>
                </div>
                <div className="content">
                    {readOnly ?
                        <p className="input-readonly">{endValueText}</p>
                        :
                        <DatePicker
                            mode={kind}
                            title="选择时间"
                            value={endValue}
                            onChange={handleChange.bind(undefined, 'endValue')}
                        >
                            <List.Item icon="vertical">{endValueText}</List.Item>
                        </DatePicker>
                    }
                </div>
            </div>

            <div className="zby-form-line-box select">
                <div className="title">
                    <i className="fa fa-asterisk" />
                    <div className="label-name">{rangeLabelName}</div>
                </div>
                <div className="content">
                    <p className="input-readonly">{datetimeDOM}</p>
                </div>
            </div>

        </div>
    )
};

function empty() {}

DateRange.PropTypes = {
    required: React.PropTypes.bool,
    startLabelName: React.PropTypes.string.isRequired,
    startValue: React.PropTypes.instanceOf(moment),
    endLabelName: React.PropTypes.string.isRequired,
    endValue: React.PropTypes.instanceOf(moment),
    rangeLabelName: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['date', 'datetime']),
    format: React.PropTypes.func,
    onChange: React.PropTypes.func
};

DateRange.defaultProps = {
    required: false,
    readOnly: false,
    kind: 'date',
    onChange: empty
};

export default DateRange;