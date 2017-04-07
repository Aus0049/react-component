/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// button 组件
class Button extends React.Component {
    getClassName () {
        let {primary, disabled} = this.props;

        return classNames(['zby-button',{
            'primary': primary && !disabled,
            'disabled': disabled && !primary,
            'primary-disabled': primary && disabled
        }]);
    }
    render () {
        const className = this.getClassName();
        //const click = this.getClickCallBack();

        return (
            <Touchable
                activeClassName="zby-button-active"
                disabled={this.props.disabled}>
                <a className={className}>
                    <span className="zby-button-text">{this.props.children}</span>
                </a>
            </Touchable>
        )
    }
}

export default Button