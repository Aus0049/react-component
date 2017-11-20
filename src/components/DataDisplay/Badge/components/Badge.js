/**
 * Created by Aus on 2017/11/20.
 */
import React from 'react'
import '../style/badge.scss'

const Badge = (props) => {
    const {prefixCls, text, overflowCount, style} = props;
    let count = text;

    if(text === 0) return null;

    if (overflowCount && Number.parseInt(text) > overflowCount) {
        count = `${overflowCount}+`;
    }

    return (
        <span className={prefixCls} style={style}>
            <span className={`${prefixCls}-text`}>{count}</span>
        </span>
    );
};

Badge.propTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    text: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]), // 徽章显示的字
    overflowCount: React.PropTypes.number, // 封顶数值 如99 text>99时候显示 99+ 为0的话不设置封顶
};

Badge.defaultProps = {
    prefixCls: 'zby-badge',
    text: 0,
    overflowCount: 99,
};

export default Badge;