/**
 * Created by Aus on 2017/11/20.
 */
import React from 'react'
import '../style/badge.scss'

const Badge = (props) => {
    const {prefixCls, text, type, overflowCount, style, children} = props;
    let count = text;

    if(type === 'dot'){
        return (
            <div className={`${prefixCls}-wrap`}>
                {children}
                <span className={`${prefixCls} dot`} />
            </div>
        );
    } else if (type === 'ribbon') {
        return (
            <div className={`${prefixCls} ribbon`}>
                <span className={`${prefixCls}-text`} style={style}>{text}</span>
            </div>
        );
    }

    if(text === 0) return null;

    if (overflowCount && Number.parseInt(text) > overflowCount) {
        count = `${overflowCount}+`;
    }

    return (
        <span className={prefixCls}>
            <span className={`${prefixCls}-text`} style={style}>{count}</span>
        </span>
    );
};

Badge.propTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    text: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]), // 徽章显示的字
    overflowCount: React.PropTypes.number, // 封顶数值 如99 text>99时候显示 99+ 为0的话不设置封顶
    type: React.PropTypes.oneOf(['ribbon', 'dot', 'common']) // 展现形式 右上角还是点
};

Badge.defaultProps = {
    prefixCls: 'zby-badge',
    text: 0,
    overflowCount: 99,
    type: 'common'
};

export default Badge;