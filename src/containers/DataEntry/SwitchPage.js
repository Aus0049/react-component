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
            switch1: true,
            switch2: true,
        }
    }
    handleChange (id, checked) {
        console.log('切换选中');
        let state = {};
        state[id] = checked;
        this.setState(state);
    }
    render () {
        return (
            <div className="page switch">
                <h1 className="title">Switch</h1>

                <ListTitle title="iOS风格" />
                <List>
                    <Item subtitle={<Switch defaultChecked={this.state.switch1} />}>不受控组件</Item>
                    <Item subtitle={<Switch checked={this.state.switch1} onChange={this.handleChange.bind(this, 'switch1')} />}>受控组件：{this.state.switch1 ? '开启' : '关闭'}</Item>
                </List>

                <ListTitle title="安卓风格" />
                <List>
                    <Item subtitle={<Switch defaultChecked={this.state.switch2} theme="android" />}>不受控组件</Item>
                    <Item subtitle={<Switch checked={this.state.switch2} theme="android" onChange={this.handleChange.bind(this, 'switch2')} />}>受控组件：{this.state.switch2 ? '开启' : '关闭'}</Item>
                </List>
            </div>
        )
    }
}

export default SwitchPage