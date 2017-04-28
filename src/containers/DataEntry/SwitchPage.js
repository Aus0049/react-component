/**
 * Created by Aus on 2017/4/11.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Switch from '../../components/DataEntry/Switch'

const Item = List.Item;

class SwitchPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            switch1: true
        }
    }
    render () {
        return (
            <div className="page switch">
                <h1 className="title">Switch</h1>

                <ListTitle title="基本" />
                <List>
                    <Item subtitle={<Switch defaultChecked={this.state.switch1} />}>{this.state.switch1 ? '开启' : '关闭'}状态</Item>
                </List>
            </div>
        )
    }
}

export default SwitchPage