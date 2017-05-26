/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

class ListPage extends React.Component {
    render () {
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="page list"
                transitionName="todo"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    List
                </h1>

                <ListTitle title="基本" />
                <List>
                    <Item>基本标题</Item>
                </List>

                <ListTitle title="添加icon" />
                <List>
                    <Item icon="horizontal">基本标题</Item>
                </List>
                <ListTitle title="添加副标题" />
                <List>
                    <Item subtitle="副标题在右" icon="horizontal">基本标题</Item>
                    <Item subtitle="副标题在下" icon="vertical" multipleLine>基本标题</Item>
                </List>

                <ListTitle title="点击事件" />
                <List>
                    <Item subtitle="请点击" icon="horizontal" onClick={()=>{alert("点击成功")}}>基本标题</Item>
                    <Item subtitle="请长按" icon="horizontal" onLongPress={()=>{alert("长按成功")}}>基本标题</Item>
                </List>

                <ListTitle title="禁止点击" />
                <List>
                    <Item subtitle="副标题在右" icon="horizontal" disabled>基本标题</Item>
                </List>
            </ReactCSSTransitionGroup>
        )
    }
}

export default ListPage