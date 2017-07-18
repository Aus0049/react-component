/**
 * Created by Aus on 2017/7/18.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/index.scss'

const TextArea = (props) => {
    const {required, labelName, readOnly, controlled, value, placeHolder, onChange} = props;

    return (
        <div className="zby-form-line-box">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])}></i>
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {readOnly ? <p className="input-readonly">{value ? value : placeHolder}</p> :
                    controlled ? <input type="text" value={value} placeholder={placeHolder} onChange={onChange} /> :
                        <input type="text" defaultValue={value} placeholder={placeHolder} />}
            </div>
        </div>
    )
};

export default TextArea;