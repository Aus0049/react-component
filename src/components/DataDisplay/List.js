/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import Item from './Item'

class List extends React.Component {
    render () {

        return (
            <div className="zby-list-box">
                {this.props.children}
            </div>
        )
    }
}

// 列表展示数据项

List.Item = Item;

export default List