/**
 * Created by Aus on 2017/4/11.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// 滑动开关组件
class Switch extends React.Component {
    getClassName () {
        return classNames(['zby-switch-box']);
    }
    render () {
        const className = this.getClassName();

        return (
            <Touchable
                onPress={this.props.onClick}
                disabled={this.props.disabled}>
                <div className={className}></div>
            </Touchable>
        )
    }
}

export default Switch