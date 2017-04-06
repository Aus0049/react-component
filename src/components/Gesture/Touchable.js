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
    handleTouchStart (event) {
        // 记录下初始位置
        // 取第一个手指
        const touch = event.touches[0];
        this.setState({
            startX: touch.clientX,
            startY: touch.clientY,
            startTimeStamp: event.timeStamp
        });
        event.persist();
    }
    handleTouchEnd (event) {
        // 记录手指离开时的位置
        const touch = event.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const endTimeStamp = event.timeStamp;

        // 判断其是什么事件
        this._GetEventType(endX, endY, endTimeStamp);

        event.persist();
    }
    _GetEventType (endX, endY, endTimeStamp) {
        const {startX, startY, startTimeStamp} = this.state;
        const distanceX = Math.abs(startX - endX);
        const distanceY = Math.abs(startY - endY);
        const timeDiff = endTimeStamp - startTimeStamp;

        // 允许手指轻微滑动 按压时间小于500ms
        if( distanceX < 6 && distanceY < 6 && timeDiff < 500){
            return "tap";
        }
    }
    render () {
        return (
            <div
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
            >asd</div>
        )
    }
}

export default Touchable