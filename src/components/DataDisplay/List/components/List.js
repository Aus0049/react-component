/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import Item from './Item'
import classNames from 'classnames'
import '../style/index.scss'

// 用于包裹item的外层组件
const List = (props) => {
    const {className, children} = props;

    return (
        <div className={classNames('zby-list-box', {[className]: !!className})}>
            {children}
        </div>
    )
};

// 列表展示数据项
List.Item = Item;

export default List