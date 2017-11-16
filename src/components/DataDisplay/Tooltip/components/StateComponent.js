/**
 * Created by Aus on 2017/11/16.
 */
import React from 'react'

// 不能给传入的children增加div
// 但是又要获取其真实 只能用ref
// 无状态组件没有this 不能绑定ref
// 转化一下 邦到一个有状态组件上
class StateComponent extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return this.props.component;
    }
}

export default StateComponent