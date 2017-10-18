/**
 * Created by Aus on 2017/10/18.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import Button from 'components/DataEntry/Button/components/Button'
import Toast from 'components/Feedback/Toast/'
import Tools from 'components/Tools/Tools'

const ToastPage = () => {
    const commonInfo = () => {
        Toast.info('普通的Toast我普通的摇！！', true);
    };
    const commonSuccess = () => {
        Toast.success('操作成功', false, 'fa-check');
    };
    const commonError = () => {
        Toast.error('有错误！！', false, undefined, ()=>{console.log('callback');});
    };
    const commonToast = () => {
        Toast.info('欢迎来到本直播间');
    };
    const successToast = () => {
        Toast.success('操作成功！', false, 'fa-check');
    };
    const errorToast = () => {
        Toast.error('操作失败！', false, 'fa-times');
    };
    const warningToast = () => {
        Toast.warning('警告：手机2s后爆炸', false, 'fa-exclamation-triangle');
    };
    const loadingToast = () => {
        Toast.loading();
        const timer = setTimeout(()=>{
            Toast.hide();
            clearTimeout(timer);
        }, 3000);
    };

    return (
        <div className="page toast">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                Toast
            </h1>

            <ListTitle title="基本" />
            <div className="button-box">
                <Button onClick={commonInfo}>纯文字提示</Button>
                <Button onClick={commonSuccess}>icon成功提示有蒙版</Button>
                <Button onClick={commonError}>纯文字报错提示有回调</Button>
            </div>
            <ListTitle title="场景使用" />
            <div className="button-box">
                <Button type="primary" onClick={commonToast}>普通提示</Button>
                <Button type="primary" onClick={successToast}>成功提示</Button>
                <Button type="primary" onClick={errorToast}>失败提示</Button>
                <Button type="primary" onClick={warningToast}>警告</Button>
                <Button type="primary" onClick={loadingToast}>加载中</Button>
            </div>
        </div>
    )
};

export default ToastPage