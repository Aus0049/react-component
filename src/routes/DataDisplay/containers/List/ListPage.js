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
            </List>

            <List renderHeader="副标题">
                <Item subtitle="subtitle" arrow="horizontal">基本标题</Item>
            </List>

            {/*<ListTitle title="添加icon" />*/}
            {/*<List>*/}
                {/*<Item icon="horizontal">基本标题</Item>*/}
            {/*</List>*/}
            {/*<ListTitle title="添加副标题" />*/}
            {/*<List>*/}
                {/*<Item subtitle="副标题在右" icon="horizontal">基本标题</Item>*/}
                {/*<Item*/}
                    {/*subtitle="副标题在下" icon="vertical"*/}
                    {/*multipleLine*/}
                {/*>基本标题*/}
                {/*</Item>*/}
            {/*</List>*/}

            {/*<ListTitle title="点击事件" />*/}
            {/*<List>*/}
                {/*<Item*/}
                    {/*subtitle="请点击" icon="horizontal"*/}
                    {/*onClick={()=>{alert('点击成功')}}*/}
                {/*>基本标题*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="请长按" icon="horizontal"*/}
                    {/*onLongPress={()=>{alert('长按成功')}}*/}
                {/*>基本标题*/}
                {/*</Item>*/}
            {/*</List>*/}

            {/*<ListTitle title="禁止点击" />*/}
            {/*<List>*/}
                {/*<Item*/}
                    {/*subtitle="副标题在右" icon="horizontal"*/}
                    {/*disabled*/}
                {/*>基本标题*/}
                {/*</Item>*/}
            {/*</List>*/}
        </div>
    )
};

export default ListPage