/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'

// button 组件
class Button extends React.Component {
    render () {
        return (
            <a className="zby-button button-default">
                <span className="zby-button-text">{this.props.children}</span>
            </a>
        )
    }
}

export default Button