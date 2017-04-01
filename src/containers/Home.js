import React from 'react'
import ListTitle from '../components/DataDisplay/ListTitle'

class Home extends React.Component {
    render () {
        return (
            <div className="home">
                <h1 className="title">React 组件库</h1>
                <ListTitle title="数据展示" />
            </div>
        )
    }
}

export default Home