/**
 * Created by Aus on 2017/11/13.
 */
import React from 'react'
import '../style/tooltip.scss'

class Tooltip extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isShow: false, // 是否显示
        }
    }
    componentDidMount () {

    }
    getTipDOM () {
        const {prefixCls, title, show} = this.props;
        const {isShow} = this.state;

        if(show !== undefined ? show : isShow){
            return (
                <div className={`${prefixCls}-title`}>{title}</div>
            );
        }
    }
    render () {
        const {prefixCls, title, trigger, show, children} = this.props;
        const tipDOM = this.getTipDOM();

        return (
            <div className={prefixCls}>
                {tipDOM}
                {children}
            </div>
        );
    }
}

Tooltip.propTypes = {
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]).isRequired, // 显示文字
    prefixCls: React.PropTypes.string, // 前缀class
    trigger: React.PropTypes.oneOf(['touch', 'click', 'long-press']), // 触发方式
    show: React.PropTypes.bool, // 是否显示
};

Tooltip.defaultProps = {
    prefixCls: 'zby-tooltip',
    trigger: 'touch',
    show: undefined
};

export default Tooltip
