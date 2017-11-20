/**
 * Created by Aus on 2017/11/20.
 */
import React from 'react'
import Badge from 'components/DataDisplay/Badge'
import List from 'components/DataDisplay/List'
import Tools from 'components/Tools/Tools'

const Item = List.Item;

const BadgePage = () => {
    return (
        <div className="page carousel">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                Badge
            </h1>

            <List renderHeader="基本">
                <Item extra={<Badge text='new' />} arrow="horizontal">文字</Item>
                <Item extra={<Badge text={10} />} arrow="horizontal">数字</Item>
                <Item extra={<Badge text={100} />} arrow="horizontal">数字超过上限</Item>
                <Item extra='extra' arrow="horizontal">
                    徽章在左侧 <Badge text='new' />
                </Item>
                <Item>
                    自定义徽章
                    <Badge text='VIP' style={{
                        marginLeft: 12,
                        padding: '0 3px',
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        color: '#f19736',
                        border: '1px solid #f19736',
                    }} />
                    <Badge text='优惠' style={{
                        marginLeft: 12,
                        padding: '0 3px',
                        backgroundColor: '#21b68a',
                        borderRadius: 2
                    }} />
                    <Badge text='v1.0' style={{
                        marginLeft: 12,
                        padding: '0 3px',
                        backgroundColor: '#f19736',
                        borderRadius: 2
                    }} />
                </Item>
            </List>

            <List renderHeader="其他形式">
                <Item
                    thumb={
                        <Badge type='dot'>
                            <img src='http://wx.qlogo.cn/mmopen/PDJMZVNsTwzBqeH9x1Zt5btKXNI1icPyLPDttubVlShj39JHoUibqD45edrqYnEyOhbhdqGRJWShhHHlmtCVwtoTIQZlHJqJdv/0' />
                        </Badge>
                    }
                >
                    <span style={{marginLeft: '20px'}}>dot形式 右上角点表示</span>
                </Item>

                <Item extra={<Badge type='ribbon' text="团" />}>
                    右侧角落显示
                </Item>
            </List>
        </div>
    );
};

export default BadgePage;