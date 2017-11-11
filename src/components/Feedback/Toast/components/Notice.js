/**
 * Created by Aus on 2017/6/14.
 */

// Notice是Toast最底层组件
// 每个黑色的小框框其实都是一个Notice
// Notice核心就是组件初始化的时候 生成一个定时器
// 根据输入的时间 加载一个动画 然后执行输入的回调
// Notice的显示和隐藏收到父组件Notification的绝对控制
import React from 'react'
import classNames from 'classnames'
import '../style/notice.scss'

function empty() {}

class Notice extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shouldClose: false, // 是否开启关闭动画
        }
    }
    componentDidMount () {
        if(this.props.duration > 0){
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration - 300); // 减掉消失动画300毫秒
        }
    }
    componentWillUnmount () {
        // 当有意外关闭的时候 清掉定时器
        this.clearCloseTimer();
    }
    clearCloseTimer () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    close () {
        // 关闭的时候 应该先清掉倒数定时器
        // 然后开启过场动画
        // 等待动画结束 执行回调
        this.clearCloseTimer();
        const _this = this;
        _this.setState({shouldClose: true});
        this.timer = setTimeout(()=>{
            if(this.props.onClose){
                this.props.onClose();
            }
            clearTimeout(_this.timer);
        }, 300);
    }
    render () {
        const {shouldClose} = this.state;
        const {prefixCls, type, iconClass, content} = this.props;

        return (
            <div
                className={classNames([prefixCls,
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'},
                    {'leave': shouldClose}
                ])}
            >
                {iconClass ? <div className={`${prefixCls}-icon`}><span className={classNames(['fa', iconClass])} /></div> : null}
                <div className={`${prefixCls}-content`}>{content}</div>
            </div>
        )
    }
}

Notice.propTypes = {
    duration: React.PropTypes.number.isRequired, // Notice显示时间
    prefixCls: React.PropTypes.string, // 前缀class
    type: React.PropTypes.oneOf(['info', 'success', 'warning', 'error']), // notice类型
    iconClass: React.PropTypes.string, // icon的class
    content: React.PropTypes.any, // Notice显示的内容
    onClose: React.PropTypes.func // 显示结束回调
};

Notice.defaultProps = {
    prefixCls: 'zby-notice',
    duration: 3000,
    onClose: empty
};

export default Notice