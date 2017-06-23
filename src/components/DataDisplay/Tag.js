/**
 * Created by Aus on 2017/6/22.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

const Tag = (props) => {
    const {content, selected, closeable, disabled, onClick, onClose, style} = props;

    const handleClick = () => {
        if(onClick) onClick(props);
    };

    let closeDOM = [];

    if(closeable) {
        closeDOM.push(
            <div className="close"><i className="fa fa-times"></i></div>
        );
    }

    return (
            <div className={classNames(['zby-tag-box', {'selected': selected}])} style={style}>
                <Touchable
                    onPress={ handleClick }
                    disabled={disabled}>
                <div>{content}</div>
                </Touchable>
                {closeDOM}
            </div>
    );
};

Tag.propTypes = {
    content: React.PropTypes.any, // tag显示内容
    selected: React.PropTypes.bool, // 当前选中状态
    closeable: React.PropTypes.bool, // 是否显示关闭按钮
    disabled: React.PropTypes.bool, // 是否可点击
    onClick: React.PropTypes.func, // 点击之后的回调
    onClose: React.PropTypes.func, // 关闭之后的回调函数
    style: React.PropTypes.object // 自定义样式
};

Tag.defaultProps = {
    selected: false,
    closeable: false,
    disabled: false
};

export default Tag
