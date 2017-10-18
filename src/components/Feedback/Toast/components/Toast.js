/**
 * Created by Aus on 2017/6/13.
 */
import Notification from './Notification'

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
const notice = (type, content, mask = false, iconClass, onClose, duration) => {
    let notificationInstance = getNewNotification();

    notificationInstance.notice({
        duration,
        type,
        mask,
        iconClass,
        content,
        onClose: () => {
            if (onClose) onClose();
        },
    });
};

export default {
    // 无动画
    show: (content, mask, iconClass, onClose, duration) => (notice(undefined, content, mask, iconClass, onClose, duration)),
    // 翻转效果
    info: (content, mask, iconClass, onClose, duration) => (notice('info', content, mask, iconClass, onClose, duration)),
    // 缩放效果
    success: (content, mask, iconClass, onClose, duration) => (notice('success', content, mask, iconClass, onClose, duration)),
    // 从下方滑入
    warning: (content, mask, iconClass, onClose, duration) => (notice('warning', content, mask, iconClass, onClose, duration)),
    // 抖动
    error: (content, mask, iconClass, onClose, duration) => (notice('error', content, mask, iconClass, onClose, duration)),
    // loading
    loading: (content) => (notice(undefined, content || '加载中...', true, 'fa-circle-o-notch fa-spin', undefined, 0)),
    // 销毁
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
}