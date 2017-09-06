/**
 * Created by Aus on 2017/9/6.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import Button from '../../components/DataEntry/Button/components/Button'
import Toast from '../../components/Feedback/Toast/'
import Tools from '../../components/Tools/Tools'

const PopoverPage = () => {
    return (
        <div className="page popover">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Toast
            </h1>
        </div>
    )
}

export default PopoverPage