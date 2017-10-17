/**
 * Created by Aus on 2017/10/13.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import List from 'components/DataDisplay/List/'
import Button from 'components/DataEntry/Button/'
import Tools from 'components/Tools/Tools'

const Item = List.Item;

const ButtonPage = () => {
    return (
        <div className="page button">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                Button
            </h1>

            <ListTitle title="基本" />
            <div className="button-box">
                <Button>default 按钮</Button>
                <Button disabled>disabled 按钮</Button>
                <Button type="primary">primary 按钮</Button>
                <Button type="primary" disabled>primary disabled 按钮</Button>
                <Button type="ghost">幽灵 按钮</Button>
                <Button type="ghost" disabled>disabled 幽灵 按钮</Button>
                <Button type="primary" loading>loading 按钮</Button>
                <Button type="primary" onClick={()=>{alert('click')}}>点击事件</Button>
            </div>

            <ListTitle title="按钮组按钮" />
            <div className="button-box button-group">
                <Button type="primary" group>登录</Button>
                <Button type="ghost" group>注册</Button>
            </div>

            <div className="button-box button-group">
                <Button type="primary" group>左</Button>
                <Button type="ghost" group>中</Button>
                <Button group>右</Button>
            </div>

            <List renderHeader="行内按钮">
                <Item extra={<Button type="ghost" inline>inline</Button>}>行内按钮</Item>
                <Item
                    subtitle="多行居中显示"
                    extra={<Button type="primary" inline>inline</Button>}
                >
                    行内按钮
                </Item>
            </List>
        </div>
    )
};

export default ButtonPage