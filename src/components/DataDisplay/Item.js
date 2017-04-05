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
        let {icon} = this.props;
        let iconDOM;

        if(!icon) return;

        if (icon == "horizontal") return <i className="icon fa fa-angle-right"></i>;

        if (icon == "vertical") return <i className="icon fa fa-angle-down"></i>;

        iconDOM = <i className="icon fa fa-angle-down"></i>;

        return iconDOM;
    }
    render () {
        let subtitleDOM = this.getSubTitleDOM();
        let classNames = this.getClassName();
        let iconDOM = this.getIconDOM();
        let {subtitle, icon, multipleLine, disabled, className, onClick, ...resProps} = this.props;

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