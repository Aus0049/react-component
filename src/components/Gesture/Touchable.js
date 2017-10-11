/**
 * Created by Aus on 2017/4/6.
 */
import React from 'react'

// 根据原生触摸事件 封装手势事件
class Touchable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startX: 0, // touchstart时 记录下初始位置 X Y
            startY: 0,
            startTimeStamp: 0, // 按下去的一瞬间的时刻
            longTapTimer: null // 如果是长按事件 需要setTimeout判断
        }
    }
    handleTouchStart (event) {
        // 如果由于长按事件监听 则清除
        let longTapTimer = this.state.longTapTimer;

        if(longTapTimer){
            clearTimeout(longTapTimer);
            this.setState({
                longTapTimer: null
            });
        }
        // 记录下初始位置
        // 取第一个手指
        const touch = event.touches[0];
        // 设置一个新的长按监听
        let newLongTapTimer = setTimeout(() => {
            // 执行tap回调函数
            //let onTap = this.props.onTap;
            //if(onTap && typeof onTap == "function" ) onTap();
        }, 800 );

        this.setState({
            startX: touch.clientX,
            startY: touch.clientY,
            startTimeStamp: event.timeStamp,
            longTapTimer: newLongTapTimer
        });

        event.persist();
    }
    handleTouchMove (event) {
        // 记录下当前移动时刻的位置
        const touch = event.touches[0], currentX = touch.clientX, currentY = touch.clientY;
        let {startX, startY, longTapTimer} = this.state;
        const distanceX = Math.abs(startX - currentX), distanceY = Math.abs(startY - currentY);

        // 如果当前位置相对于start位置有轻微移动 结束长按事件监听
        if((distanceX > 5 || distanceY > 5) && longTapTimer ){
            clearTimeout(longTapTimer);
            this.setState({
                longTapTimer: null
            });
        }
    }
    handleTouchEnd (event) {
        // 记录手指离开时的位置
        const touch = event.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const endTimeStamp = event.timeStamp;
        let longTapTimer = this.state.longTapTimer;

        if(longTapTimer){
            clearTimeout(longTapTimer);
            this.setState({
                longTapTimer: null
            });
        }

        // 判断其是什么事件
        const touchType = this._GetEventType(endX, endY, endTimeStamp);

        switch (touchType) {
            case 'tap':
                // 执行tap回调函数
                let onTap = this.props.onTap;
                if(onTap && typeof onTap == 'function' ) onTap();
                break;
        }

        event.persist();
    }
    _GetEventType (endX, endY, endTimeStamp) {
        const {startX, startY, startTimeStamp} = this.state;
        const distanceX = Math.abs(startX - endX);
        const distanceY = Math.abs(startY - endY);
        const timeDiff = endTimeStamp - startTimeStamp;

        // 允许手指轻微滑动 按压时间小于500ms
        if( distanceX < 6 && distanceY < 6 && timeDiff < 500){
            return 'tap';
        }
    }
    render () {
        return (
            <div
                className="touchable-box"
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchMove={this.handleTouchMove.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Touchable