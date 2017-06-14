/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import Button from '../../components/DataEntry/Button'
import Toast from '../../components/Feedback/Toast'
import Tools from '../../components/Tools/Tools'

const ToastPage = () => {
    const commonToast = () => {
        Toast.show('普通的Toast我普通的摇！！', 3000)
    };
    window.commonToast = commonToast;

    return (
        <div className="page toast">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Toast
            </h1>

            <ListTitle title="基本" />
            <div className="button-box">
                <Button onClick={commonToast}>纯文字</Button>
            </div>

        </div>
    )
};

export default ToastPage