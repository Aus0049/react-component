/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// button 组件
class Button extends React.Component {
    static defaultProps = {
        disabled: false,
        group: false,
        inline: false
    };
    static propTypes = {
        type: React.PropTypes.string, // 类型 枚举 有 primary ghost 两种 没写的话 默认白底黑字的button
        disabled: React.PropTypes.bool, // 是否不可点击 不可点击时 样式会有调整 默认false
        group: React.PropTypes.bool, // 是否 按按钮组显示 默认是false
        inline: React.PropTypes.bool, // 是否是行内显示 默认false
        iconClass: React.PropTypes.string, // icon类名 只支持awesome的icon
        onClick: React.PropTypes.func, // 点击的回调函数
        activeClassName: React.PropTypes.string, // 点击时候的类名
        className: React.PropTypes.string // 自定义class
    };
    getClassName () {
        let {inline, group, type, disabled, className} = this.props;

        return classNames(['zby-button',{
            'inline': inline,
            'group': group,
            'primary': type == "primary",
            'ghost': type == "ghost",
            'disabled': disabled
        }, className]);
    }
    getIconDOM () {
        let {iconClass} = this.props;

        if (iconClass) return <i className={`fa ${iconClass}`}></i>;
    }
    render () {
        const className = this.getClassName();
        const iconDOM = this.getIconDOM();

        return (
            <Touchable
                activeClassName={this.props.activeClassName ? this.props.activeClassName : "zby-button-active"}
                onPress={this.props.onClick}
                disabled={this.props.disabled}>
                <a className={className}>
                    {iconDOM}
                    <span className="zby-button-text">{this.props.children}</span>
                </a>
            </Touchable>
        )
    }
}

export default Button