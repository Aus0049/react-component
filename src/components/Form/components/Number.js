/**
 * Created by Aus on 2017/7/31.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/index.scss'

const Number = (props) => {
    const {required, labelName, readOnly, value, placeHolder, unit, onChange} = props;

    function handleChange (e) {
        onChange({value: e.target.value});
    }

    return (
        <div className="zby-form-line-box number">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])}></i>
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {readOnly ? <p className="input-readonly">{value ? value : placeHolder}</p> :
                    <input type="text" value={value} placeholder={placeHolder} onChange={handleChange} />}
                <span className="unit">{unit}</span>
            </div>
        </div>
    )
};

function empty() {}

Number.PropTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.oneOfType(['string', 'number']),
    placeHolder: React.PropTypes.string,
    unit: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
};

Number.defaultProps = {
    required: false,
    readOnly: false,
    onChange: empty
};

export default Number;
