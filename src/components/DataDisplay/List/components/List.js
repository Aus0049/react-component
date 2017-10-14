/**
 * Created by Aus on 2017/4/1.
 */
import React from 'react'
import Item from './Item'
import classNames from 'classnames'
import '../style/list.scss'

// 用于包裹item的外层组件
const List = (props) => {
    const { prefixCls, className, renderHeader, renderFooter, children, ...restProps } = props;
    const wrapClass = classNames(prefixCls, className);

    return (
        <div className={wrapClass} {...restProps}>
            {renderHeader ? <div className={`${prefixCls}-header`}>
                {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
            </div> : null}
            {children ? <div className={`${prefixCls}-body`}>{children}</div> : null}
            {renderFooter ? <div className={`${prefixCls}-footer`}>
                {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
            </div> : null}
        </div>
    )
};

// 列表展示数据项
List.Item = Item;

// List中的item 组件
List.PropTypes = {
    prefixCls: React.PropTypes.string, // class前缀
    className: React.PropTypes.string, // 自定义class
    renderHeader: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]), // list上面的说明
    renderFooter: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]) // list结束的说明
};

List.defaultProps = {
    prefixCls: 'zby-list'
};

export default List