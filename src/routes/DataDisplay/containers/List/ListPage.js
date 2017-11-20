/**
 * Created by Aus on 2017/10/14.
 */
import React from 'react'
import List from 'components/DataDisplay/List/'
import Tools from 'components/Tools/Tools'

const Item = List.Item;

const ListPage = () => {
    return (
        <div className="page list">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                List
            </h1>

            <List renderHeader="基本">
                <Item extra="extra">基本标题</Item>
                <Item extra="onClick" onClick={()=>{alert('click')}}>点击事件</Item>
                <Item extra="onLongPress" onLongPress={()=>{alert('long-press')}}>长按事件</Item>
                <Item extra="disabled" disabled>禁止点击</Item>
                <Item
                    thumb={<img style={{marginRight: '12px'}} src='http://wx.qlogo.cn/mmopen/PDJMZVNsTwzBqeH9x1Zt5btKXNI1icPyLPDttubVlShj39JHoUibqD45edrqYnEyOhbhdqGRJWShhHHlmtCVwtoTIQZlHJqJdv/0' />}
                    arrow="horizontal"
                    subtitle="前端工程师 💻&🎧️️"
                >
                    Aus
                </Item>
                <Item thumb="fa-commenting" arrow="horizontal">我的消息</Item>
                <Item thumb="fa-file-text" arrow="horizontal">我的订单</Item>
            </List>

            <List renderHeader="溢出效果">
                <Item>
                    由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
                </Item>
                <Item wrap={false}>
                    由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
                </Item>
                <Item extra="wrap">
                    由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
                </Item>
                <Item extra="no-wrap" wrap={false}>
                    由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
                </Item>
            </List>
        </div>
    )
};

export default ListPage