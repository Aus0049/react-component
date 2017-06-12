/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

class Item extends React.Component {
    static defaultProps = {
        multiple: false,
        disabled: false
    };
    static propTypes = {
        subtitle: React.PropTypes.node, // 列表项的副标题 可选
        icon: React.PropTypes.oneOf(['horizontal', 'vertical']), // 列表项的icon 可选 枚举 horizontal/vertical
        multiple: React.PropTypes.bool, // 列表项是否多行显示 默认否
        onClick: React.PropTypes.func, // 列表项点击回调事件
        onLongPress: React.PropTypes.func, // 长按回调事件
        disabled: React.PropTypes.bool // 列表项不可点击 默认值false
    };
    getClassName () {
        let {subtitle, icon, className, multipleLine, disabled} = this.props;

        let cn = classNames(['zby-item-box', {
            'with-subtitle': subtitle,
            'multiple': multipleLine,
            'with-icon': icon,
            'disabled': disabled
        }]);

        if(className) cn += " " + className;

        return cn;
    }
    getSubTitleDOM () {
        let {subtitle} = this.props;

        if (subtitle) return <span className="subtitle">{subtitle}</span>;
    }
    getIconDOM () {
        const {icon} = this.props;
        let iconDOM;

        if(!icon) return;

        switch (icon) {
            case "horizontal":
                // 水平向右的箭头
                return <i className="icon fa fa-angle-right"></i>;
            case "vertical":
                // 垂直向下的箭头
                return <i className="icon fa fa-angle-down"></i>;
        }

        iconDOM = <i className="icon fa fa-angle-down"></i>;

        return iconDOM;
    }
    render () {
        const {subtitle, icon, multipleLine, disabled, className, onClick, onLongPress, ...resProps} = this.props;
        const subtitleDOM = this.getSubTitleDOM();
        const classNames = this.getClassName();
        const iconDOM = this.getIconDOM();

        return (
            <Touchable
                activeClassName={onClick && !disabled ? "zby-list-item-tap-active" : ''}
                disabled={disabled}
                onPress={onClick}
                onLongPress={onLongPress}>
                <div className="zby-list-item" {...resProps}>
                    <div className={classNames}>
                        <div className="zby-item">{this.props.children}</div>
                        {subtitleDOM}
                        {iconDOM}
                    </div>
                </div>
            </Touchable>
        )
    }
}

// List中的item 组件

export default Item