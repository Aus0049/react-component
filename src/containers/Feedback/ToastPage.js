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
        Toast.info('普通的Toast我普通的摇！！', 3000);
    };
    const commonSuccess = () => {
        Toast.success('操作成功', 3000, undefined, false);
    };
    const commonError = () => {
        Toast.error('有错误！！', 3000);
    };
    const iconWithoutMask = () => {
        Toast.info('加载中...', 3000, "fa-circle-o-notch fa-spin", false);
    };
    const iconWithCallback = () => {
        Toast.info('有回调', 3000, "fa-exclamation", false, ()=>{console.log("callback");});
    };

    return (
        <div className="page toast">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Toast
            </h1>

            <ListTitle title="基本" />
            <div className="button-box">
                <Button onClick={commonToast}>纯文字普通提示</Button>
                <Button onClick={commonSuccess}>纯文字成功提示</Button>
                <Button onClick={commonError}>纯文字报错提示</Button>
                <Button type="primary" onClick={iconWithoutMask}>带icon 无蒙版</Button>
                <Button type="primary" onClick={iconWithCallback}>带icon 有回调</Button>
            </div>
        </div>
    )
};

export default ToastPage