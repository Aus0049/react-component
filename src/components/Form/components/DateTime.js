/**
 * Created by Aus on 2017/7/26.
 */
import React from 'react'
import classNames from 'classnames'
import DatePicker from '../../DataEntry/DataPicker/'
import List from '../../DataDisplay/List/'
import '../style/form.scss'

const DateTime = (props) => {
    const {required, labelName, value, readOnly, kind, onChange} = props;
    let valueText = <span>&nbsp;</span>;

    if(value){
        valueText = kind === 'date' ? value.format('YYYY-MM-DD') : value.format('YYYY-MM-DD HH:mm');
    }

    return (
        <div className="zby-form-line-box select">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {readOnly ?
                    <p className="input-readonly">{valueText}</p>
                    :
                    <DatePicker
                        mode={kind}
                        title="选择日期"
                        value={value}
                        onChange={(value)=>{onChange({value: value})}}
                    >
                        <List.Item icon="vertical">{valueText}</List.Item>
                    </DatePicker>
                }
            </div>
        </div>
    );
};

function empty() {}

DateTime.PropTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['date', 'time']),
    onChange: React.PropTypes.func
};

DateTime.defaultProps = {
    required: false,
    readOnly: false,
    kind: 'date',
    onChange: empty
};

export default DateTime;