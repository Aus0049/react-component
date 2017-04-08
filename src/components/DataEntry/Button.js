/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// button 组件
class Button extends React.Component {
    getClassName () {
        let {inline, primary, ghost, disabled} = this.props;

        return classNames(['zby-button',{
            'inline': inline,
            'primary': primary && !disabled,
            'ghost': ghost && !disabled,
            'disabled': disabled && !primary,
            'primary-disabled': primary && disabled
        }]);
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
                activeClassName="zby-button-active"
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