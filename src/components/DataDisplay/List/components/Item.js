/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import '../style/item.scss'

const Item = (props) => {
    const {prefixCls, className, activeClassName, thumb, extra, subtitle, arrow, wrap, disabled, onClick, onLongPress, children, ...resProps} = props;

    return (
        <Touchable
            activeClassName={(onClick || onLongPress) && !disabled ? activeClassName : null}
            disabled={disabled}
            onPress={onClick}
            onLongPress={onLongPress}
        >
            <div className={classNames([prefixCls, {disabled: disabled}, className])} {...resProps}>
                {thumb ? typeof thumb === 'string' ? <span className={`fa fa-thumb ${thumb}`} /> : thumb : null}
                {typeof children === 'object' ?
                    <div className={classNames([`${prefixCls}-content`, {wrap: wrap}])}>
                        {children}
                    </div>
                    :
                    <div className={classNames([`${prefixCls}-content`, {wrap: wrap}])}>
                        {children}
                        {subtitle ? <div className={`${prefixCls}-subtitle`}>{subtitle}</div> : null}
                    </div>
                }
                {extra ? <div className={classNames([`${prefixCls}-extra`, {'wrap': wrap}])}>{extra}</div> : null}
                {arrow ?
                    <div className={`${prefixCls}-arrow`}>{arrow !== 'empty' ?
                        <span className={classNames(['fa', {
                            'fa-angle-right': arrow === 'horizontal',
                            'fa-angle-up': arrow === 'up',
                            'fa-angle-down': arrow === 'down'}
                        ])}
                        />
                        :
                        null}
                    </div>
                    :
                    null
                }
            </div>
        </Touchable>
    )
};

// List中的item 组件
Item.PropTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    className: React.PropTypes.string, // 自定义class
    activeClassName: React.PropTypes.string, // 点击效果class
    thumb: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]), // 缩略图
    extra: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]), // 右侧的内容
    subtitle: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]), // 列表项的副标题
    arrow: React.PropTypes.oneOf(['horizontal', 'up', 'down', 'empty']), // 列表项的箭头 枚举
    wrap: React.PropTypes.bool, // 超出文字是否会被隐藏
    disabled: React.PropTypes.bool, // 列表项不可点击
    onClick: React.PropTypes.func, // 列表项点击回调事件
    onLongPress: React.PropTypes.func, // 长按回调事件
};

Item.defaultProps = {
    prefixCls: 'zby-item',
    activeClassName: 'zby-item-active',
    wrap: true,
    disabled: false
};

export default Item