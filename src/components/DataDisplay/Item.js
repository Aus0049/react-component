/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'

class Item extends React.Component {
    render () {

        return (
            <div className="zby-list-item">{this.props.children}</div>
        )
    }
}

// List中的item 组件

export default Item