/**
 * Created by Aus on 2017/7/18.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/index.scss'

const TextArea = (props) => {
    const {required, labelName, readOnly, controlled, value, placeHolder, onChange} = props;

    return (
        <div className="zby-form-line-box text-area">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])}></i>
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {readOnly ? <p className="input-readonly">{value ? value : placeHolder}</p> :
                    controlled ? <textarea value={value} placeholder={placeHolder} onChange={onChange} ></textarea> :
                        <textarea defaultValue={value} placeholder={placeHolder}></textarea>}
            </div>
        </div>
    )
};

function empty() {}

TextArea.PropTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    controlled: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    placeHolder: React.PropTypes.string,
    onChange: React.PropTypes.func,
};

TextArea.defaultProps = {
    required: false,
    readOnly: false,
    controlled: true,
    onChange: empty
};

export default TextArea;