/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Button from '../../components/DataEntry/Button'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

const ButtonPage = () => {
    return (
        <div className="page button">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Button
            </h1>

            <ListTitle title="基本" />
            <div className="button-box">
                <Button>default 按钮</Button>
                <Button disabled>disabled 按钮</Button>
                <Button type="primary">primary 按钮</Button>
                <Button type="primary" disabled>primary disabled 按钮</Button>
                <Button type="primary" iconClass="fa-circle-o-notch fa-spin">带icon 按钮</Button>
                <Button type="ghost">幽灵 按钮</Button>
                <Button type="ghost" disabled>disabled 幽灵 按钮</Button>
                <Button type="primary" onClick={()=>{alert("click")}}>点击事件</Button>
            </div>

            <ListTitle title="按钮组按钮" />
            <div className="button-box">
                <Button type="primary" group>按钮组 按钮</Button>
                <Button type="ghost" group>按钮组 按钮</Button>
            </div>

            <ListTitle title="行内按钮" />
            <div className="button-box">
                <Button inline>行内按钮</Button>
                <Button inline type="primary">行内primary按钮</Button>
                <Button inline type="ghost">行内幽灵按钮</Button>
            </div>

            <ListTitle title="结合List使用" />
            <List>
                <Item subtitle={<Button inline type="ghost">行内 按钮</Button>}>副标题嵌入button</Item>
            </List>
        </div>
    )
};

export default ButtonPage