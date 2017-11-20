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
            </List>
        </div>
    );
};

export default BadgePage;