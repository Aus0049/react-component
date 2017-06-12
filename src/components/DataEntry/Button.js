/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// button 组件
const Button = (props) => {
    const {inline, group, type, disabled, className, iconClass, activeClassName, onClick, children} = props;

    const cn = classNames(['zby-button',{
        'inline': inline,
        'group': group,
        'primary': type == "primary",
        'ghost': type == "ghost",
        'disabled': disabled
    }, className]);

    const iconDOM = iconClass ? <i className={`fa ${iconClass}`}></i> : '';

    return (
        <Touchable
            activeClassName={activeClassName ? activeClassName : "zby-button-active"}
            onPress={onClick}
            disabled={disabled}>
            <a className={cn}>
                {iconDOM}
                <span className="zby-button-text">{children}</span>
            </a>
        </Touchable>
    )
};

Button.propTypes = {
    type: React.PropTypes.oneOf(['primary', 'ghost']), // 类型 枚举 有 primary ghost 两种 没写的话 默认白底黑字的button
    disabled: React.PropTypes.bool, // 是否不可点击 不可点击时 样式会有调整 默认false
    group: React.PropTypes.bool, // 是否 按按钮组显示 默认是false
    inline: React.PropTypes.bool, // 是否是行内显示 默认false
    iconClass: React.PropTypes.string, // icon类名 只支持awesome的icon
    onClick: React.PropTypes.func, // 点击的回调函数
    activeClassName: React.PropTypes.string, // 点击时候的类名
    className: React.PropTypes.string // 自定义class
};

Button.defaultProps = {
    disabled: false,
    group: false,
    inline: false
};

export default Button