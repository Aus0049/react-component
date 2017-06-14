/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'

/**
 *
 * Toast组件比较特殊
 * 因为<Toast />不会被直接渲染在DOM中
 * 而是动态插入页面中
 * 所以需要特殊注意 这种动态插入在React中是如何实现的
 */
const Toast = (props) => {
    return <div>toast</div>;
};

export default Toast