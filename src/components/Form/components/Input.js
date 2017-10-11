/**
 * Created by Aus on 2017/7/17.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/index.scss'
import {showError, clearError} from './Func'

const feedbackIconMap = {
    success: 'check-circle',
    warning: 'exclamation-circle',
    wrong: 'times-circle',
    loading: 'circle-o-notch fa-spin'
};

const Input = (props) => {
    const {required, labelName, readOnly, controlled, value, placeHolder, kind, error, onChange, feedbackIcon} = props;

    function handleChange (e) {
        onChange({value: e.target.value});
    }

    function handleFocus () {
        if(!!error){
            showError(error);
        }
    }

    function handleBlur () {
        if(!!error){
            clearError(error);
        }
    }

    let inputType;

    switch (kind) {
        case 'number':
            inputType = 'number';
            break;
        case 'phone':
            inputType = 'number';
            break;
        case 'password':
            inputType = 'password';
            break;
        default:
            inputType = 'text';
            break;
    }

    return (
        <div className={classNames(['zby-form-line-box', {'error': !!error}])}>
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                <div className="label-name">{labelName}</div>
            </div>
            <div className={classNames(['content', {'has-feedback': feedbackIcon}])}>
                {readOnly ?
                    <p className="input-readonly">{value ? value : placeHolder}</p>
                    : controlled ?
                        <input
type={inputType} value={value}
placeholder={placeHolder} onChange={handleChange}
onFocus={handleFocus} onBlur={handleBlur}
                        />
                        :
                        <input
type={inputType} defaultValue={value}
placeholder={placeHolder} onFocus={handleFocus}
onBlur={handleBlur}
                        />
                }
                {!readOnly && feedbackIcon ?
                    <span className={`fa fa-${feedbackIconMap[feedbackIcon]}`} />
                    :
                    ''
                }
            </div>
        </div>
    )
};

function empty() {}

Input.PropTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    controlled: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    placeHolder: React.PropTypes.string,
    kind: React.PropTypes.oneOf(['password', 'phone', 'email', 'number', 'text']),
    error: React.PropTypes.string,
    onChange: React.PropTypes.func,
    feedbackIcon: React.PropTypes.oneOf(['success', 'warning', 'error', 'loading'])
};

Input.defaultProps = {
    required: false,
    readOnly: false,
    controlled: true,
    kind: 'text',
    onChange: empty
};

export default Input;