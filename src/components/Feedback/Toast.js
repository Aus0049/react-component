/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'
import Notification from './Notification'

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// 所以需要特殊注意 这种动态插入在React中是如何实现的
let newNotification;

// 获得一个Notification
function getNewNotification () {
    // 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
        // newNotification.destroy();
        // newNotification = null;
    }

    return newNotification;
}


function notice(content, type, duration = 3000, onClose, mask = true) {
    let notificationInstance = getNewNotification(mask);

    notificationInstance.notice({
        duration,
        content: !!type ? (
            <div>
                <div>icon</div>
                <div >{content}</div>
            </div>
        ) : (
            <div>
                <div>{content}</div>
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
    show(content, duration, mask) {
        return notice(content, 'info', duration, () => {}, mask);
    }
}