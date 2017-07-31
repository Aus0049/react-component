/**
 * Created by Aus on 2017/4/11.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import '../style/index.scss'

// 滑动开关组件
class Switch extends React.Component {
    constructor (props) {
        super(props);

        let checked = true;

        // 如果传入checked 说明是受控组件
        if('checked' in props && props.checked !== undefined){
            checked = !!props.checked;
        } else {
            // 否则不受控
            checked = !!props.defaultChecked;
        }

        this.state = {
            checked: checked,
            focus: false
        }
    }
    handleTouch (id) {
        if('start' == id){
            this.setState({
                focus: true
            });
        } else {
            this.setState({
                focus: false
            });
        }
    }
    toggle () {
        const checked = !(this.props.checked !== undefined ? this.props.checked : this.state.checked);
        this.setChecked(checked);
    }
    setChecked (checked) {
        if (!('checked' in this.props && this.props.checked !== undefined)) {
            this.setState({
                checked,
            });
        }

        this.props.onChange(checked);
    }
    getClassName () {
        const checked = this.props.checked !== undefined ? this.props.checked : this.state.checked;
        const {theme, disabled} = this.props;
        const {focus} = this.state;

        return classNames(['zby-switch-box', {
            'iOS': theme === 'iOS',
            'android': theme === 'android',
            'on' : checked,
            'off' : !checked,
            'focus': focus,
            'disabled': disabled
        }]);
    }
    getAttachedDOM () {
        const {attachedText} = this.props;

        if(!attachedText || attachedText.length !== 2){return;}

        return  [
            <span key='a-t' className='attachedTextTrue'>{attachedText[0]}</span>,
            <span key='a-f' className='attachedTextFalse'>{attachedText[1]}</span>
        ];

    }
    render () {
        const className = this.getClassName();
        const attachedDOM = this.getAttachedDOM();

        return (
            <Touchable
                onPress={this.toggle.bind(this)}
                disabled={this.props.disabled}>
                <div
                    className={className}
                    onTouchStart={this.handleTouch.bind(this, 'start')}
                    onTouchEnd={this.handleTouch.bind(this, 'end')}>
                    {attachedDOM}
                </div>
            </Touchable>
        )
    }
}

Switch.propTypes = {
    theme: React.PropTypes.oneOf(['iOS', 'android']), // 主题 枚举 iOS风格和Android风格
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    attachedText: React.PropTypes.array,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
};

Switch.defaultProps = {
    theme: "iOS",
    defaultChecked: true,
    onChange: empty,
};

function empty() {}

export default Switch