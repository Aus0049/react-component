/**
 * Created by Aus on 2017/4/11.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Switch from '../../components/DataEntry/Switch'

const Item = List.Item;

class ButtonPage extends React.Component {
    render () {
        return (
            <div className="page switch">
                <h1 className="title">Switch</h1>

                <ListTitle title="基本" />
                <List>
                    <Item subtitle={<Switch/>}>开启状态</Item>
                </List>
            </div>
        )
    }
}

export default ButtonPage