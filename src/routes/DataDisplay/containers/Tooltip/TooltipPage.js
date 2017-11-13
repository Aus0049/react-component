/**
 * Created by Aus on 2017/11/13.
 */
import React from 'react'
// import List from 'components/DataDisplay/List/'
import ListTitle from 'components/DataDisplay/ListTitle/'
import Tooltip from 'components/DataDisplay/Tooltip/'
import Button from 'components/DataEntry/Button/'
import Tools from 'components/Tools/Tools'

const ListPage = () => {
    return (
        <div className="page list">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                Tooltip
            </h1>

            <ListTitle title="基本" />
            <div className="button-box">
                <Tooltip
                    title="我是提示"
                    show
                >
                    <Button>default 按钮</Button>
                </Tooltip>
            </div>
        </div>
    )
};

export default ListPage