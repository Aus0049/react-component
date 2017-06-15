/**
 * Created by Aus on 2017/6/14.
 */

// Notification是Notice上层组件
// 是动态插入和删除DOM节点的核心
// 同时也向上提供给Toast很多核心函数
import React from 'react'
import ReactDOM from 'react-dom'
import Notice from './Notice'

class Notification extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            notices: [], // 存储当前有的notices
            hasMask: true, // 是否显示蒙版
        }
    }
    add (notice) {
        // 添加notice
        // 创造一个不重复的key
        const {notices} = this.state;
        const key = notice.key ? notice.key : notice.key = getUuid();
        const mask = notice.mask ? notice.mask : false;
        const temp = notices.filter((item) => item.key === key).length;

        if(!temp){
            // 不存在重复的 添加
            notices.push(notice);
            this.setState({
                notices: notices,
                hasMask: mask
            });
        }
    }
    remove (key) {
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key),
            };
        });
    }
    getNoticeDOM () {
        const _this = this;
        const {notices} = this.state;
        let result = [];

        notices.map((notice)=>{
            const closeCallback = () => {
                _this.remove.bind(notice.key);

                if(notice.onClose){
                    notice.onClose();
                }
            };

            result.push(
                <Notice key={notice.key} {...notice} onClose={closeCallback} />
            );
        });

        return result;
    }
    getMaskDOM () {
        const {notices, hasMask} = this.state;

        if(notices.length > 0 && hasMask == true) return <div className="zby-mask"></div>;
    }
    render () {
        const noticesDOM = this.getNoticeDOM();
        const maskDOM = this.getMaskDOM();

        return (
            <div className="zby-notification-box">
                {maskDOM}
                {noticesDOM}
            </div>
        )
    }
}

// 统计notice总数 防止重复
let noticeNumber = 0;

const getUuid = () => {
    return "notification-" + new Date().getTime() + "-" + noticeNumber++;
};

// Notification增加一个重写方法
// 该方法方便Notification组件动态添加到页面中和重写
Notification.reWrite = function (properties) {
    const { getContainer, ...props } = properties || {};

    let div;
    if (getContainer) {
        div = getContainer();
    } else {
        div = document.createElement('div');
        document.body.appendChild(div);
    }

    const notification = ReactDOM.render(<Notification {...props} />, div);

    return {
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice(key) {
            notification.remove(key);
        },
        destroy() {
            console.log(div);
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

export default Notification