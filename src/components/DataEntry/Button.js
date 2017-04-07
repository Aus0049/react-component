/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// button 组件
class Button extends React.Component {
    getClassName () {
        let {primary} = this.props;

        return classNames(['zby-button',{
            'primary': primary
        }]);
    }
    render () {
        const className = this.getClassName();
        return (
            <Touchable
                activeClassName="zby-button-active">
                <a className={className}>
                    <span className="zby-button-text">{this.props.children}</span>
                </a>
            </Touchable>
        )
    }
}

export default Button