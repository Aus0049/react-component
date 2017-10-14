/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import '../style/item.scss'

const Item = (props) => {
    const {prefixCls, thumb, extra, subtitle, arrow, wrap, disabled, onClick, onLongPress, children, ...resProps} = props;

    return (
        <Touchable
            activeClassName={`${prefixCls}-active`}
            disabled={disabled}
            onPress={onClick}
            onLongPress={onLongPress}
        >
            <div className={prefixCls} {...resProps}>
                {thumb ? typeof thumb === 'string' ? <img className={`${prefixCls}-thumb`} src={thumb}/> : thumb : null}
                <div className={classNames([`${prefixCls}-content`, {wrap: wrap}])}>
                    {children}
                    {subtitle ? <div className={`${prefixCls}-subtitle`}>{subtitle}</div> : null}
                </div>
                {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
                <div className={`${prefixCls}-arrow`}>{arrow !== 'empty' ?
                    <span className={classNames(['fa', {
                        'fa-angle-right': arrow === 'horizontal',
                        'fa-angle-up': arrow === 'up',
                        'fa-angle-down': arrow === 'down'}
                        ])}
                    />
                    :
                    null}</div>
            </div>
        </Touchable>
    )
};

// class Item extends React.Component {
//     getClassName () {
//         const {subtitle, icon, className, multipleLine, disabled} = this.props;
//
//         return classNames(['zby-item-box', {
//             'with-subtitle': subtitle,
//             'multiple': multipleLine,
//             'with-icon': icon,
//             'disabled': disabled,
//             [className]: className
//         }]);
//     }
//     getSubTitleDOM () {
//         const {subtitle} = this.props;
//
//         if (subtitle) return <span className="subtitle">{subtitle}</span>;
//     }
//     getIconDOM () {
//         const {icon} = this.props;
//
//         if(!icon) return;
//
//         switch (icon) {
//             case 'horizontal':
//                 // 水平向右的箭头
//                 return <i className="icon fa fa-angle-right" />;
//             case 'vertical':
//                 // 垂直向下的箭头
//                 return <i className="icon fa fa-angle-down" />;
//         }
//
//         return <i className="icon fa fa-angle-down" />;
//     }
//     render () {
//         const {subtitle, icon, multipleLine, disabled, className, onClick, onLongPress, ...resProps} = this.props;
//         const subtitleDOM = this.getSubTitleDOM();
//         const classNames = this.getClassName();
//         const iconDOM = this.getIconDOM();
//
//         return (
//             <Touchable
//                 activeClassName={!disabled ? 'zby-list-item-tap-active' : ''}
//                 disabled={disabled}
//                 onPress={onClick}
//                 onLongPress={onLongPress}
//             >
//                 <div className="zby-list-item" {...resProps}>
//                     <div className={classNames}>
//                         <div className="zby-item">{this.props.children}</div>
//                         {subtitleDOM}
//                         {iconDOM}
//                     </div>
//                 </div>
//             </Touchable>
//         )
//     }
// }

function empty() {}

// List中的item 组件
Item.PropTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
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
    arrow: 'empty',
    wrap: true,
    disabled: false,
    onClick: empty,
    onLongPress: empty
};

export default Item