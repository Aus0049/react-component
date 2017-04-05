/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import Item from './Item'

class List extends React.Component {
    getClassName () {
        let cn = "zby-list-box";
        let {className} = this.props;

        if(className){
            cn += " " + className;
        }

        return cn;
    }
    render () {
        let className = this.getClassName();

        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}

// 列表展示数据项

List.Item = Item;

export default List