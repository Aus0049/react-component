/**
 * Created by Aus on 2017/9/6.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import Button from '../../components/DataEntry/Button/components/Button'
import Popover from '../../components/Feedback/Popover/'
import Tools from '../../components/Tools/Tools'

const PopoverPage = () => {
    return (
        <div className="page popover">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                Toast
            </h1>
            <ListTitle title="基本" />
            <div className="button-box">
                <Popover >
                    <Button>按住显示</Button>
                </Popover>
            </div>
        </div>
    )
}

export default PopoverPage