/**
 * Created by Aus on 2017/6/14.
 */
/**
 * Notice是Toast最底层组件
 */
import React from 'react'

class Notice extends React.Component {
    static propTypes = {
        duration: React.PropTypes.number, // Notice显示时间
        onClose: React.PropTypes.func // 显示结束回调
    };
    static defaultProps = {
        duration: 1500,
    };
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
    };
    close () {
        this.clearCloseTimer();

        if(this.props.onClose){
            this.props.onClose();
        }
    }
    render () {
        return (
            <div className="zby-notice">
                Notice
            </div>
        )
    }
}

export default Notice