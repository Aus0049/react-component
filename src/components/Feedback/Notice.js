/**
 * Created by Aus on 2017/6/14.
 */
/**
 * Notice是Toast最底层组件
 */
import React from 'react'
import classNames from 'classnames'

class Notice extends React.Component {
    static propTypes = {
        duration: React.PropTypes.number, // Notice显示时间
        content: React.PropTypes.any, // Notice显示的内容
        onClose: React.PropTypes.func // 显示结束回调
    };
    static defaultProps = {
        duration: 3000,
    };
    constructor (props) {
        super(props);
        this.state = {
            shouldClose: false, // 何时关闭
        }
    }
    componentDidMount () {
        this.closeTimer = setTimeout(() => {
            this.close();
        }, this.props.duration);
    }
    componentWillUnmount () {
        this.clearCloseTimer();
    }
    clearCloseTimer () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    close () {
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

        return (
            <div className={classNames(['zby-notice-box', {'leave': shouldClose}])}>
                {this.props.content}
            </div>
        )
    }
}

export default Notice