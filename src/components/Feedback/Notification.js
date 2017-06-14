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
            notices: [] // 存储当前有的notices
        }
    }
    add (notice) {
        // 添加notice
        // 创造一个不重复的key
        const key = notice.key ? notice.key : notice.key = getUuid();

        this.setState(previousState => {
            const notices = previousState.notices;
            if (!notices.filter(v => v.key === key).length) {
                return {
                    notices: notices.concat(notice),
                };
            }
        });
    }
    remove (key) {
        const {notices} = this.state;

        let index = -1;

        notices.map((item, i)=>{
            if(item.key === key){
                index = i;
            }
        });

        notices.splice(index, 1);

        this.setState({notices: notices});
    }
    getNoticeDOM () {
        const _this = this;
        const {notices} = this.state;
        let result = [];

        notices.map((notice)=>{
            const closeCallback = function () {
                _this.remove.bind(_this, notice.key)();
                if(notice.onChange){
                    notice.onChange();
                }
            };

            result.push(
                <Notice key={notice.key} {...notice} onClose={closeCallback} />
            );
        });

        return result;
    }
    getMaskDOM () {
        const {notices} = this.state;

        if(notices.length == 0) return;

        return <div className="zby-mask"></div>;
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
        component: notification,
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
};

export default Notification