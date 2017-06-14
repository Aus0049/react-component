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
        const {notices} = this.state;
        const key = notice.key ? notice.key : getUuid();

        if(!notices.filter((item) => item.key === key).length){
            // 不存在重复的 添加
            notices.push(notice);
            this.setState({notices: notices});
        }
    }
    remove (key) {
        const {notices} = this.state;

        let index = -1;

        notices.map((item, i)=>{
            if(item.key === key){
                index = i;
            }
        });

        notices.slice(index, 1);

        this.setState({notices: notices});
    }
    getNoticeDOM () {
        const {notices} = this.state;
        let result = [];

        notices.map((notice)=>{
            result.push(
                <Notice {...notice} />
            );
        });

        return result;
    }
    render () {
        const noticesDOM = this.getNoticeDOM();

        return (
            <div className="zby-notification">
                {noticesDOM}
            </div>
        )
    }
}

// 统计notice总数 防止重复
let noticeNumber = 0;

const getUuid = () => {
    return "notification-" + new Date() + "-" + noticeNumber++;
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