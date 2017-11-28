/**
 * Created by Aus on 2017/7/31.
 */
import React from 'react'
import classNames from 'classnames'
import { default as Sw } from '../../DataEntry/Switch/'
import '../style/form.scss'

const Switch = (props) => {
    const {required, labelName, readOnly, value, controlled, attachedText, theme, onChange} = props;

    function handleChange (value) {
        onChange({value: value});
    }

    return (
        <div className="zby-form-line-box switch">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                <Sw
                    disabled={readOnly}
                    them={theme}
                    attachedText={attachedText}
                    checked={controlled ? value : undefined}
                    defaultChecked={!controlled ? value : undefined}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

function empty() {}

Switch.propTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.bool.isRequired,
    controlled: React.PropTypes.bool,
    attachedText: React.PropTypes.array,
    theme: React.PropTypes.oneOf(['iOS', 'android']), // 主题 枚举 iOS风格和Android风格
    onChange: React.PropTypes.func,
};

Switch.defaultProps = {
    required: false,
    readOnly: false,
    controlled: true,
    theme: 'iOS',
    onChange: empty
};

export default Switch