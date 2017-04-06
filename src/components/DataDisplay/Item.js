/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'

class Item extends React.Component {
    getClassName () {
        let cn = "zby-list-item";
        let {subtitle, icon, className, multipleLine, disabled} = this.props;

        if(subtitle) cn += " with-subtitle";

        if(multipleLine) cn += " multiple";

        if(icon) cn += " with-icon";

        if(disabled) cn += " disabled";

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
        const {subtitle, icon, multipleLine, disabled, className, onClick, ...resProps} = this.props;
        const subtitleDOM = this.getSubTitleDOM();
        const classNames = this.getClassName();
        const iconDOM = this.getIconDOM();

        return (
            <div className={classNames} onClick={onClick} {...resProps}>
                <div className="zby-item">{this.props.children}</div>
                {subtitleDOM}
                {iconDOM}
            </div>
        )
    }
}

// List中的item 组件

export default Item