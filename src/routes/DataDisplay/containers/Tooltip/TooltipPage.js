/**
 * Created by Aus on 2017/11/13.
 */
import React from 'react'
// import List from 'components/DataDisplay/List/'
import ListTitle from 'components/DataDisplay/ListTitle/'
import Tooltip from 'components/DataDisplay/Tooltip/'
import Button from 'components/DataEntry/Button/'
import Tools from 'components/Tools/Tools'
// const Item = List.Item;

const TooltipPage = () => {
    return (
        <div className="page list">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                Tooltip
            </h1>

            <ListTitle title="结合按钮使用" />
            <div className="button-box">
                <Tooltip title="按钮被禁用">
                    <Button disabled>禁用按钮提示</Button>
                </Tooltip>

                <Tooltip
                    title={<span><span className="fa fa-exclamation-circle"/>提示文字</span>}
                    trigger='click'
                >
                    <Button type="primary">点击提示</Button>
                </Tooltip>

                <Tooltip
                    title={<span><span className="fa fa-exclamation-circle"/>长按提示文字</span>}
                    trigger='long-press'
                >
                    <Button type="primary">长按提示</Button>
                </Tooltip>
            </div>

            {/*<List renderHeader="结合文字使用">*/}
                {/*<Item wrap={false}>*/}
                    {/*由于 React 的设计思想极其独特，属于革命性创新，性能出众，*/}
                    {/*<Tooltip*/}
                        {/*title={<span><span className="fa fa-exclamation-circle"/>代码逻辑却非常简单</span>}*/}
                    {/*>*/}
                        {/*<span style={{textDecoration: 'underline'}}>代码逻辑却非常简单。</span>*/}
                    {/*</Tooltip>*/}
                    {/*所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。*/}
                {/*</Item>*/}
            {/*</List>*/}
        </div>
    )
};

export default TooltipPage