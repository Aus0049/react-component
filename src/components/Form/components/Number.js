/**
 * Created by Aus on 2017/7/31.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/form.scss'

const Number = (props) => {
    const {required, labelName, readOnly, controlled, value, placeHolder, unit, onChange} = props;

    function handleChange (e) {
        onChange({value: e.target.value});
    }

    return (
        <div className="zby-form-line-box number">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {readOnly ? <p className="input-readonly">{value ? value : placeHolder}</p> :
                    controlled ? <input
type="text" value={value}
placeholder={placeHolder} onChange={handleChange}
                                 /> :
                        <input
type="text" defaultValue={value}
placeholder={placeHolder}
                        />}
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
    controlled: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    placeHolder: React.PropTypes.string,
    unit: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
};

Number.defaultProps = {
    required: false,
    readOnly: false,
    controlled: true,
    onChange: empty
};

export default Number;
