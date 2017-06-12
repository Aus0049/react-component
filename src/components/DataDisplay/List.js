/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import Item from './Item'

// 用于包裹item的外层组件
const List = (props) => {
    let cn = "zby-list-box";
    const {className, children} = props;

    if(className){
        cn += " " + className;
    }

    return (
        <div className={cn}>
            {children}
        </div>
    )
};

// 列表展示数据项
List.Item = Item;

export default List