/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'
import classNames from 'classnames'
import Notification from './Notification'

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// 所以需要特殊注意 这种动态插入在React中是如何实现的
let newNotification;

// 获得一个Notification
function getNewNotification (mask) {
    // 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
        // newNotification.destroy();
        // newNotification = null;
    }

    return newNotification;
}

function notice(content, type, icon, duration = 3000, onClose, mask = true) {
    let notificationInstance = getNewNotification(mask);

    notificationInstance.notice({
        duration,
        mask: mask,
        content: !!icon ? (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'error': type === 'error'}
                ])
            }>
                <div className="zby-toast-icon"><i className={"fa " + icon}></i></div>
                <div className="zby-toast-content">{content}</div>
            </div>
        ) : (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'error': type === 'error'}
                ])
            }>
                <div className="zby-toast-content">{content}</div>
            </div>
        ),
        onClose: () => {
            if (onClose) {
                onClose();
            }
            notificationInstance.destroy();
            notificationInstance = null;
            newNotification = null;
        },
    });
}

export default {
    info(content, duration, icon, mask, onClose) {
        return notice(content, 'info', icon, duration, onClose, mask);
    },
    error(content, duration, icon, mask, onClose) {
        return notice(content, 'error', icon, duration, onClose, mask);
    }
}