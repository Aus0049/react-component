/**
 * Created by Aus on 2017/11/13.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Hammer from 'hammerjs'
import '../style/tooltip.scss'

let totalZIndex = 100;

class Tooltip extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isShow: false, // 是否显示
        };
    }
    // componentWillMount () {
    //     // 组件挂载之前 clone 传入的children
    //     // 只能有一个children
    //     const cloneChildren = React.cloneElement(!this.props.children ? null :
    //         React.Children.only(this.props.children));
    //
    //     if (cloneChildren !== null) {
    //         // 因为props不可修改 clone children 然后修改某些属性
    //         this.cloneChildren = React.cloneElement(cloneChildren);
    //     }
    // }
    componentDidMount () {
        // console.log(this.refs);
        // console.log(ReactDOM.findDOMNode(this.refs['321']));
        this.createTipDOM();
        if(this.props.show === null) this.bindTouchEvent();
    }
    bindTouchEvent () {
        // 绑定事件
        const {trigger} = this.props;

        const cloneChildDOM = ReactDOM.findDOMNode(this.refs.child);
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
    createContent (shouldShow) {
        const {prefixCls, title} = this.props;

        if(!this.tipContainerDOM) {
            // 创建div
            const tipContainerDOM = document.createElement('div');
            tipContainerDOM.className = prefixCls;
            tipContainerDOM.style.zIndex = totalZIndex++;

            this.tipContainerDOM = tipContainerDOM;
            document.body.appendChild(tipContainerDOM);
        }

        // 获取child真实位置
        const elementPosition = ReactDOM.findDOMNode(this.refs.child).getBoundingClientRect();

        const tipContentDOM =
            <div
                className={classNames([`${prefixCls}-title`, {hidden: !shouldShow}])}
                 style={{
                     top: elementPosition.y - (elementPosition.height) / 2,
                     left: elementPosition.x + (elementPosition.width) / 2
                 }}

            >
                {title}
            </div>;

        this.tipDOM = ReactDOM.render(tipContentDOM, this.tipContainerDOM);
    }
    createTipDOM () {
        const {show} = this.props;
        const {isShow} = this.state;
        const shouldShow = show !== null ? show : isShow;

        if(this.cloneChildren === null) return;

        this.createContent(shouldShow);

        // // 只能有一个children
        // let overlay = !children ? null :
        //     React.Children.only(children)
        //
        // if (overlay !== null) {
        //     // 创建dom
        //     this.createContent();
        //     // this._mountOverlayTarget()
        //     // Save reference for future access.
        //     // this._overlayInstance = React.render(overlay, this._overlayTarget)
        // } else {
        //     this.hideContent();
        //     // Unrender if the component is null for transitions to null
        //     // this._unrenderOverlay()
        //     // this._unmountOverlayTarget()
        // }

        // if(show !== null ? show : isShow){
        //     return (
        //         <div className={`${prefixCls}-title`}>{title}</div>
        //     );
        // }
    }
    render () {
        // 组件挂载之前 clone 传入的children
        // 只能有一个children
        const cloneChildren = React.cloneElement(!this.props.children ? null :
            React.Children.only(this.props.children));

        if (cloneChildren !== null) {
            // 因为props不可修改 clone children 然后修改某些属性
            this.cloneChildren = React.cloneElement(cloneChildren, {ref: 'child'});

            return this.cloneChildren;
        }

        return null;
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
