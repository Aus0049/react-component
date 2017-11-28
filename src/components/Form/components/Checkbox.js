/**
 * Created by Aus on 2017/7/27.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/form.scss'

const Checkbox = (props) => {
    const {required, labelName, value, options, readOnly, onChange} = props;

    const itemDOM = [];

    function handleChange (targetValue) {
        if(value.indexOf(targetValue) !== -1){
            value.splice(value.indexOf(targetValue), 1);
            onChange({value: value});
            return;
        }

        value.push(targetValue);
        onChange({value: value});
    }

    options.map((item, i)=>{
        itemDOM.push(
            <div
key={`${i}-${item.value}`}
                 className={classNames(['checkbox-item-line', 'checkbox-item', {readonly: readOnly || item.disabled}])}
                 onClick={()=>{readOnly || item.disabled ? empty() : handleChange(item.value)}}
            >
                <div className="check-box-box">
                    <div className={classNames(['check-box', {checked: value.indexOf(item.value) !== -1}])}>
                        <span className="front" />
                        <span className="back">
                            <i className="fa fa-check-circle" />
                        </span>
                    </div>
                </div>
                <div className="checkbox-label">{item.label}</div>
            </div>
        );
    });

    return (
        <div className="zby-form-line-box checkbox">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {itemDOM}
            </div>
        </div>
    )
};

function empty() {}

Checkbox.PropTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    value: React.PropTypes.array,
    readOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

Checkbox.defaultProps = {
    required: false,
    value: [],
    readOnly: false,
    onChange: empty
};

export default Checkbox;