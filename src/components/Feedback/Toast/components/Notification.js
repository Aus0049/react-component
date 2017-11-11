/**
 * Created by Aus on 2017/6/14.
 */

// Notification是Notice父组件，容器
// 是动态插入和删除DOM节点的核心
// 同时也向上暴露给Toast重写改变自己的方法
import React from 'react'
import ReactDOM from 'react-dom'
import Notice from './Notice'
import '../style/notification.scss'

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
        // 根据key删除对应
        this.setState(previousState => ({notices: previousState.notices.filter(notice => notice.key !== key)}));
    }
    getNoticeDOM () {
        const _this = this;
        const {notices} = this.state;
        const result = [];

        notices.map((notice)=>{
            // 每个Notice onClose的时候 删除掉notices中对应key的notice
            const closeCallback = () => {
                _this.remove(notice.key);
                // 如果有用户传入的onClose 执行
                if(notice.onClose) notice.onClose();
            };

            result.push(
                <Notice
                    key={notice.key} {...notice}
                    onClose={closeCallback}
                />
            );
        });

        return result;
    }
    getMaskDOM () {
        const {notices, hasMask} = this.state;
        // notices为空的时候 不显示蒙版
        // 始终只有一个蒙版
        if(notices.length > 0 && hasMask === true) return <div className="zby-mask" />;
    }
    render () {
        const {prefixCls} = this.props;
        const noticesDOM = this.getNoticeDOM();
        const maskDOM = this.getMaskDOM();

        return (
            <div className={prefixCls}>
                {maskDOM}
                <div className={`${prefixCls}-box`}>
                    {noticesDOM}
                </div>
            </div>
        )
    }
}

// 统计notice总数 防止重复
let noticeNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return 'notification-' + new Date().getTime() + '-' + noticeNumber++;
};

// Notification增加一个重写方法
// 该方法方便Notification组件动态添加到页面中和重写
Notification.reWrite = function (properties) {
    const { ...props } = properties || {};

    let div;

    div = document.createElement('div');
    document.body.appendChild(div);

    const notification = ReactDOM.render(<Notification {...props} />, div);

    return {
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice(key) {
            notification.remove(key);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

Notification.propTypes = {
    prefixCls: React.PropTypes.string, // 组件class前缀
};

Notification.defaultProps = {
    prefixCls: 'zby-notification',
};

export default Notification