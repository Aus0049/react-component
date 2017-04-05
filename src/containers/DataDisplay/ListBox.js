/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

class ListBox extends React.Component {
    render () {
        return (
            <div className="list">
                <h1 className="title">List</h1>

                <ListTitle title="基本" />
                <List>
                    <Item>基本标题</Item>
                </List>

                <ListTitle title="添加icon" />
                <List>
                    <Item icon="horizontal">基本标题</Item>
                </List>
                <ListTitle title="添加副标题" />
                <List>
                    <Item subtitle="副标题在右" icon="horizontal">基本标题</Item>
                    <Item subtitle="副标题在下" icon="horizontal">基本标题</Item>
                </List>
            </div>
        )
    }
}

export default ListBox