/**
 * Created by Aus on 2017/7/17.
 */
import React from 'react'
import classNames from 'classnames'
import Icon from 'component-font-awesome'
import '../style/form.scss'

const feedbackIconMap = {
    success: 'check-circle',
    warning: 'exclamation-circle',
    wrong: 'times-circle',
    loading: 'circle-o-notch fa-spin'
};

class Input extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            stateValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount () {
        const {controlled, value} = this.props;

        if(!controlled){
            this.setState({stateValue: value});
        }
    }
    handleChange (e) {
        const value = e.target.value;
        const {controlled, onChange} = this.props;

        if(controlled){
            onChange({value: value});
            return;
        }

        this.setState({stateValue: value});
    }
    render () {
        const {stateValue} = this.state;
        const {prefixCls, required, labelName, value, readOnly, placeHolder, controlled, kind, errorText, feedbackIcon} = this.props;

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
            <div className={classNames([prefixCls, {error: !!errorText}])}>
                <div className="title">
                    <Icon type="asterisk" className={required ? 'required' : null} />
                    <div className="label-name">{labelName}</div>
                </div>
                <div className={classNames(['content', {'has-feedback': feedbackIcon}])}>
                    {readOnly ?
                        <p className="input-readonly">{value ? value : placeHolder}</p>
                        : controlled ?
                            <input
                                type={inputType} value={value}
                                placeholder={placeHolder} onChange={this.handleChange}
                            />
                            :
                            <input
                                type={inputType} value={stateValue}
                                onChange={this.handleChange}
                                placeholder={placeHolder}
                            />
                    }
                    {!readOnly && feedbackIcon ? <Icon type={feedbackIconMap[feedbackIcon]} /> : ''}
                </div>
            </div>
        );
    }
}

function empty() {}

Input.PropTypes = {
    labelName: React.PropTypes.string.isRequired,
    prefixCls: React.PropTypes.string, // 前缀class
    required: React.PropTypes.bool, // 是否必填
    readOnly: React.PropTypes.bool, // 是否只读
    controlled: React.PropTypes.bool, // 是否受控组件
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    placeHolder: React.PropTypes.string,
    kind: React.PropTypes.oneOf(['password', 'phone', 'email', 'number', 'text']), // 字段类型
    errorText: React.PropTypes.string, // 报错信息
    feedbackIcon: React.PropTypes.oneOf(['success', 'warning', 'error', 'loading', '']),
    onChange: React.PropTypes.func,
};

Input.defaultProps = {
    prefixCls: 'zby-form-line',
    required: false,
    readOnly: false,
    controlled: true,
    value: '',
    placeHolder: '',
    kind: 'text',
    errorText: '',
    feedbackIcon: '',
    onChange: empty
};

export default Input;
// import React from 'react'
// import classNames from 'classnames'
// import {showError, clearError} from '../util'
// import '../style/index.scss'
//
// const feedbackIconMap = {
//     success: 'check-circle',
//     warning: 'exclamation-circle',
//     wrong: 'times-circle',
//     loading: 'circle-o-notch fa-spin'
// };
//
// const Input = (props) => {
//     const {required, labelName, readOnly, controlled, value, placeHolder, kind, error, onChange, feedbackIcon} = props;
//
//     function handleChange(e) {
//         onChange({value: e.target.value});
//     }
//
//     function handleFocus() {
//         if (!!error) {
//             showError(error);
//         }
//     }
//
//     function handleBlur() {
//         if (!!error) {
//             clearError(error);
//         }
//     }
//
//     let inputType;
//
//     switch (kind) {
//         case 'number':
//             inputType = 'number';
//             break;
//         case 'phone':
//             inputType = 'number';
//             break;
//         case 'password':
//             inputType = 'password';
//             break;
//         default:
//             inputType = 'text';
//             break;
//     }
//
//     return (
//         <div className={classNames(['zby-form-line-box', {'error': !!error}])}>
//             <div className="title">
//                 <i className={classNames(['fa', 'fa-asterisk', {required: required}])}/>
//                 <div className="label-name">{labelName}</div>
//             </div>
//             <div className={classNames(['content', {'has-feedback': feedbackIcon}])}>
//                 {readOnly ?
//                     <p className="input-readonly">{value ? value : placeHolder}</p>
//                     : controlled ?
//                         <input
//                             type={inputType} value={value}
//                             placeholder={placeHolder} onChange={handleChange}
//                             onFocus={handleFocus} onBlur={handleBlur}
//                         />
//                         :
//                         <input
//                             type={inputType} defaultValue={value}
//                             placeholder={placeHolder} onFocus={handleFocus}
//                             onBlur={handleBlur}
//                         />
//                 }
//                 {!readOnly && feedbackIcon ?
//                     <span className={`fa fa-${feedbackIconMap[feedbackIcon]}`}/>
//                     :
//                     ''
//                 }
//             </div>
//         </div>
//     )
// };
//
// function empty() {
// }
//
// Input.PropTypes = {
//     labelName: React.PropTypes.string.isRequired,
//     prefixCls: React.PropTypes.string, // 前缀class
//     required: React.PropTypes.bool,
//     readOnly: React.PropTypes.bool,
//     controlled: React.PropTypes.bool,
//     value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
//     placeHolder: React.PropTypes.string,
//     kind: React.PropTypes.oneOf(['password', 'phone', 'email', 'number', 'text']),
//     error: React.PropTypes.string,
//     feedbackIcon: React.PropTypes.oneOf(['success', 'warning', 'error', 'loading', '']),
//     onChange: React.PropTypes.func,
// };
//
// Input.defaultProps = {
//     prefixCls: 'zby-form-input',
//     required: false,
//     readOnly: false,
//     controlled: true,
//     value: '',
//     placeHolder: '',
//     kind: 'text',
//     error: '',
//     feedbackIcon: '',
//     onChange: empty
// };
//
// export default Input;