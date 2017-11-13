/**
 * Created by Aus on 2017/11/13.
 */
import React from 'react'
import Hammer from 'hammerjs'
import '../style/tooltip.scss'

class Tooltip extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isShow: false, // 是否显示
        }
    }
    componentDidMount () {
        if (this.props.show === null) this.bindTouchEvent();
    }
    bindTouchEvent () {
        // 绑定事件
        const {trigger} = this.props;

        const containerDOM = this.refs.container;
        const containerHammer = new Hammer(containerDOM);

        switch (trigger) {
            case 'touch': {
                containerDOM.addEventListener('touchstart', ()=>{
                    this.setState({isShow: true});
                }, false);
                containerDOM.addEventListener('touchend', ()=>{
                    this.setState({isShow: false});
                }, false);
                break;
            }
            case 'click': {
                containerHammer.on('tap', ()=>{
                    this.setState({isShow: !this.state.isShow});
                });
                break;
            }
            case 'long-press': {
                containerHammer.on('press', ()=>{
                    this.setState({isShow: !this.state.isShow});
                });
                break;
            }
            default: break;
        }
    }
    getTipDOM () {
        const {prefixCls, title, show} = this.props;
        const {isShow} = this.state;

        if(show !== null ? show : isShow){
            return (
                <div className={`${prefixCls}-title`}>{title}</div>
            );
        }
    }
    render () {
        const {prefixCls, children} = this.props;
        const tipDOM = this.getTipDOM();

        return (
            <div className={prefixCls} ref="container">
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
    show: React.PropTypes.oneOf([null, true, false]), // 是否显示
};

Tooltip.defaultProps = {
    prefixCls: 'zby-tooltip',
    trigger: 'touch',
    show: null
};

export default Tooltip
