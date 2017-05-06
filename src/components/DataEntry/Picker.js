/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// 选择器组件
class Picker extends React.Component {
    render () {
        return (
            <div className="zby-picker-box">
                {this.props.children}
            </div>
        )
    }
}

export default Picker