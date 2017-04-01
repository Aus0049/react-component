/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'

class ListTitle extends React.Component {
    getClassName () {
        let className = "zby-list-title";
        let {align} = this.props;

        if(align){
            className += " " + align;
        }

        return className;
    }
    render () {
        let {title} = this.props;
        const className = this.getClassName();

        return (
            <div className={className}>{title}</div>
        )
    }
}

// 用于展示列表最上方 列表数据的title
// title: title展示名称 必填 字数最好不要太多 溢出文字会...显示
// align: 对齐方式 可选值 枚举 "center" "right" 默认或者不填是左对齐
ListTitle.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default ListTitle