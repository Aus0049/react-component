/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import Item from './Item'

class List extends React.Component {
    getClassName () {
        let cn = "zby-list-box";
        let {subtitle, icon, className} = this.props;

        if(subtitle){
            cn += " with-subtitle";
        }

        if(icon){
            cn += " with-icon";
        }

        if(className){
            cn += " " + className;
        }

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

        iconDOM = <i className="icon fa fa-angle-down"></i>;

        return iconDOM;
    }
    render () {
        let subtitleDOM = this.getSubTitleDOM();
        let className = this.getClassName();
        let iconDOM = this.getIconDOM();
        let {onClick} = this.props;

        return (
            <div className={className} onClick={onClick}>
                {this.props.children}
                {subtitleDOM}
                {iconDOM}
            </div>
        )
    }
}

// 列表展示数据项

List.Item = Item;

export default List