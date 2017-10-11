/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'
import classNames from 'classnames'
import Notification from './Notification'
import '../style/index.scss'

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast组件核心就是通过Notification暴露的重写方法 动态改变Notification
let newNotification;

// 获得一个Notification
const getNewNotification = () => {
    // 单例 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }

    return newNotification;
};

// notice方法实际上就是集合参数 完成对Notification的改变
const notice = (content, type, icon, duration = 3000, onClose, mask = true) => {
    let notificationInstance = getNewNotification();

    notificationInstance.notice({
        duration,
        mask: mask,
        content: !!icon ? (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'}
                ])
            }
            >
                <div className="zby-toast-icon"><i className={'fa ' + icon} /></div>
                <div className="zby-toast-content">{content}</div>
            </div>
        ) : (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'}
                ])
            }
            >
                <div className="zby-toast-content">{content}</div>
            </div>
        ),
        onClose: () => {
            if (onClose) onClose();
        },
    });
};

export default {
    // 无动画
    show(content, duration, icon, mask, onClose) {
        return notice(content, undefined, icon, duration, onClose, mask);
    },
    // 翻转效果
    info(content, duration, icon, mask, onClose) {
        return notice(content, 'info', icon, duration, onClose, mask);
    },
    // 缩放效果
    success(content, duration, icon, mask, onClose) {
        return notice(content, 'success', icon, duration, onClose, mask);
    },
    // 从下方滑入
    warning(content, duration, icon, mask, onClose) {
        return notice(content, 'warning', icon, duration, onClose, mask);
    },
    // 抖动
    error(content, duration, icon, mask, onClose) {
        return notice(content, 'error', icon, duration, onClose, mask);
    },
    // 销毁
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
}