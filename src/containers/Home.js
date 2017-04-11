import React from 'react'
import ListTitle from '../components/DataDisplay/ListTitle'
import List from '../components/DataDisplay/List'
import Tools from '../components/Tools/Tools'

const Item = List.Item;

class Home extends React.Component {
    render () {
        return (
            <div className="page home">
                <h1 className="title">React 组件库</h1>
                <ListTitle title="数据输入" />
                <List>
                    <Item subtitle="Button" icon="horizontal" onClick={()=>{Tools.linkTo("/data-entry/button")}}>按钮</Item>
                    <Item subtitle="Switch" icon="horizontal" onClick={()=>{Tools.linkTo("/data-entry/switch")}}>滑动按钮</Item>
                </List>
                <ListTitle title="数据展示" />
                <List>
                    <Item subtitle="List" icon="horizontal" onClick={()=>{Tools.linkTo("/data-display/list")}}>列表项</Item>
                </List>
            </div>
        )
    }
}

export default Home