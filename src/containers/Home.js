import React from 'react'
import ListTitle from '../components/DataDisplay/ListTitle'
import List from '../components/DataDisplay/List'

const Item = List.Item;

class Home extends React.Component {
    render () {
        return (
            <div className="home">
                <h1 className="title">React 组件库</h1>
                <ListTitle title="数据展示" />
                <List><Item>标题</Item></List>
            </div>
        )
    }
}

export default Home