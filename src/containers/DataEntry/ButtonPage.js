/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Button from '../../components/DataEntry/Button'

const Item = List.Item;

class ButtonPage extends React.Component {
    render () {
        return (
            <div className="page button">
                <h1 className="title">Button</h1>

                <ListTitle title="基本" />
                <div className="button-box">
                    <Button>default 按钮</Button>
                    <Button disabled>disabled 按钮</Button>
                    <Button primary>primary 按钮</Button>
                    <Button primary disabled>primary disabled 按钮</Button>
                    <Button primary iconClass="fa-circle-o-notch fa-spin">带icon 按钮</Button>
                    <Button ghost>幽灵 按钮</Button>
                    <Button ghost disabled>disabled 幽灵 按钮</Button>
                    <Button primary onClick={()=>{alert("click")}}>点击事件</Button>
                </div>

                <ListTitle title="行内按钮" />
                <div className="button-box">
                    <Button inline>行内 按钮</Button>
                    <Button inline primary>行内primary 按钮</Button>
                    <Button inline ghost>行内幽灵 按钮</Button>
                </div>
            </div>
        )
    }
}

export default ButtonPage