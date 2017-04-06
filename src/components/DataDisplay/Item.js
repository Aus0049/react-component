/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

class Item extends React.Component {
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
        const {subtitle, icon, multipleLine, disabled, className, onPress, onLongPress, ...resProps} = this.props;
        const subtitleDOM = this.getSubTitleDOM();
        const classNames = this.getClassName();
        const iconDOM = this.getIconDOM();

        return (
            <Touchable
                activeClassName="zby-list-item-tap-active"
                disabled={disabled}
                onPress={onPress}
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