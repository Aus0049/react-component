/**
 * Created by Aus on 2017/11/13.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Hammer from 'hammerjs'
import StateComponent from './StateComponent'
import {getTipPosition, getTitleDOMPosition} from '../util/'
import '../style/tooltip.scss'

let totalZIndex = 100;

class Tooltip extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isShow: false, // 是否显示
        };
    }
    componentDidMount () {
        setTimeout(()=>{
            this.createTipDOM();
            if(this.props.show === null) this.bindTouchEvent();
        }, 10);
    }
    componentWillUnmount () {
        // 销毁
        this.tipContainerDOM.remove();
        this.tipDOM.remove();
    }
    bindTouchEvent () {
        // 绑定事件
        const {trigger} = this.props;

        if(!this.childDOM) return;

        const cloneChildDOM = this.childDOM;
        const cloneChildDOMHammer = new Hammer(cloneChildDOM);

        switch (trigger) {
            case 'touch': {
                cloneChildDOM.addEventListener('touchstart', ()=>{
                    this.setState({isShow: true});
                }, false);
                cloneChildDOM.addEventListener('touchend', ()=>{
                    this.setState({isShow: false});
                }, false);
                break;
            }
            case 'click': {
                cloneChildDOMHammer.on('tap', ()=>{
                    this.setState({isShow: !this.state.isShow});
                });
                break;
            }
            case 'long-press': {
                cloneChildDOMHammer.on('press', ()=>{
                    this.setState({isShow: !this.state.isShow});
                });
                break;
            }
            default: break;
        }
    }
    createTipDOM () {
        // 创建
        const {prefixCls} = this.props;
        // 创建div
        const tipContainerDOM = document.createElement('div');
        tipContainerDOM.className = prefixCls;
        tipContainerDOM.style.zIndex = totalZIndex++;

        this.tipContainerDOM = tipContainerDOM;
        document.body.appendChild(tipContainerDOM);

        // 获取child真实位置
        this.childDOM = ReactDOM.findDOMNode(this.child);

        this.updateTipDOM();

        // 隐藏的dom是获取不到宽高的
        // 克隆dom 将其插入到页面中 然后remove
        this.titleDOMPosition = getTitleDOMPosition(this.tipDOM);
    }
    updateTipDOM () {
        const {prefixCls, show, title, direct} = this.props;
        const {isShow} = this.state;
        const shouldShow = show !== null ? show : isShow;

        // 获取child真实位置
        this.childDOMPostion = this.childDOM.getBoundingClientRect();

        // 这块位置根据屏幕动态计算出来
        const {direction, position} = getTipPosition(this.childDOMPostion, this.titleDOMPosition, direct);

        const tipContentDOM =
            <div
                className={classNames([`${prefixCls}-title`, {hidden: !shouldShow}, direction])}
                style={position}
            >
                {title}
            </div>;

        this.tipDOM = ReactDOM.render(tipContentDOM, this.tipContainerDOM);
    }
    render () {
        // 第一次之后render
        if(this.cloneChild) {
            this.updateTipDOM();
            return <StateComponent ref={r=>this.child = r} component={this.cloneChild} />;
        }

        // 第一次render
        // 组件挂载之前 clone 传入的children
        // 只能有一个children
        const cloneChildren = React.cloneElement(!this.props.children ? null :
            React.Children.only(this.props.children));

        // 因为props不可修改 clone children 然后修改某些属性
        this.cloneChild = React.cloneElement(cloneChildren);

        return <StateComponent ref={r=>this.child = r} component={this.cloneChild} />;
    }
}

Tooltip.propTypes = {
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]).isRequired, // 显示文字
    prefixCls: React.PropTypes.string, // 前缀class
    trigger: React.PropTypes.oneOf(['touch', 'click', 'long-press']), // 触发方式
    show: React.PropTypes.oneOf([null, true, false]), // 是否显示
    direct: React.PropTypes.oneOf(['left', 'right', 'right', 'auto']), // 显示方向
    children: React.PropTypes.node, // 被tip的节点
};

Tooltip.defaultProps = {
    prefixCls: 'zby-tooltip',
    trigger: 'touch',
    show: null,
    direct: 'auto',
    children: <div />
};

export default Tooltip
