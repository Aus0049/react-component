/**
 * Created by Aus on 2017/10/17.
 */
import React from 'react'
import List from 'components/DataDisplay/List/'
import Switch from 'components/DataEntry/Switch/'
import Tools from 'components/Tools/Tools'

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
                <h1 className="title">
                    <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                    Switch
                </h1>

                <List renderHeader="iOS风格">
                    <Item extra={<Switch defaultChecked={this.state.switch1}/>}>
                        不受控组件
                    </Item>
                    <Item extra={<Switch checked={this.state.switch1} onChange={this.handleChange.bind(this, 'switch1')} />}>
                        {`受控组件：${this.state.switch1 ? '开启' : '关闭'}`}
                    </Item>
                </List>

                <List renderHeader="安卓风格">
                    <Item extra={<Switch defaultChecked={this.state.switch2} theme="android"/>}>
                        不受控组件
                    </Item>
                    <Item extra={<Switch
                        checked={this.state.switch2}
                        theme="android"
                        onChange={this.handleChange.bind(this, 'switch2')}
                    />}
                    >
                        {`受控组件：${this.state.switch2 ? '开启' : '关闭'}`}
                    </Item>
                </List>

                <List renderHeader="禁止🚫">
                    <Item extra={<Switch defaultChecked={false} disabled />}>iOS关闭状态</Item>
                    <Item extra={<Switch defaultChecked disabled />}>iOS开启状态</Item>
                    <Item extra={<Switch
                        defaultChecked theme="android"
                        disabled
                    />}
                    >
                        安卓关闭状态
                    </Item>
                    <Item extra={<Switch
                        defaultChecked theme="android"
                        disabled
                    />}
                    >
                        安卓开启状态
                    </Item>
                </List>

                <List renderHeader="带文字">
                    <Item extra={<Switch defaultChecked={false} attachedText={['开', '关']} />}>iOS关闭状态</Item>
                    <Item extra={<Switch
                        defaultChecked attachedText={['ON', 'OFF']}
                        theme="android"
                    />}
                    >
                        安卓关闭状态
                    </Item>
                </List>
            </div>
        )
    }
}

export default SwitchPage