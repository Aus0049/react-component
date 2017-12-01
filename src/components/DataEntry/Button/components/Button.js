/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import '../style/index.scss'

// button 组件
const Button = (props) => {
    const {prefixCls, type, disabled, group, inline, loading, activeClassName, iconClass, className, onClick, children} = props;

    const cn = classNames([prefixCls,{
        'inline': inline,
        'group': group,
        'primary': type === 'primary',
        'ghost': type === 'ghost',
        'disabled': disabled || loading
    }, className]);

    // 有loading的时候，显示loading icon
    const iconDOM = loading ?
        <span className='fa fa-circle-o-notch fa-spin' />
        : iconClass ? <span className={`fa ${iconClass}`} /> : '';

    return (
        <Touchable
            activeClassName={activeClassName}
            disabled={disabled || loading}
            onPress={onClick}
        >
            <a className={cn}>
                {iconDOM}
                <span className={`${prefixCls}-text`}>{children}</span>
            </a>
        </Touchable>
    )
};

Button.propTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    type: React.PropTypes.oneOf(['default', 'primary', 'ghost']), // 类型 枚举 有 default（白底黑字） primary（绿底白字） ghost（白底绿字） 三种
    disabled: React.PropTypes.bool, // 是否不可点击 不可点击时 样式会有调整 默认false
    group: React.PropTypes.bool, // 是否 按按钮组显示 默认是false
    inline: React.PropTypes.bool, // 是否是行内显示 默认false
    loading: React.PropTypes.bool, // 是否显示loading loading时候按钮显示loading icon并且不可点击
    activeClassName: React.PropTypes.string, // 点击时候的类名
    iconClass: React.PropTypes.string, // icon类名 只支持awesome的icon
    className: React.PropTypes.string, // 自定义class
    onClick: React.PropTypes.func, // 点击的回调函数
};

Button.defaultProps = {
    prefixCls: 'zby-button',
    type: 'default',
    disabled: false,
    group: false,
    inline: false,
    loading: false,
    activeClassName: 'zby-button-active'
};

export default Button