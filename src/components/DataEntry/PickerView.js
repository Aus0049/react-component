/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'
import ZScroller from 'zscroller'

// 选择器组件
class PickerView extends React.Component {
    componentDidMount () {
        this.bindScrollEvent();
    }
    bindScrollEvent () {
        // 绑定滚动的事件
        let content = this.refs.content;
        // 最后还是用了何一鸣的zscroll插件
        // 但是这个插件并没有太多的文档介绍 gg
        // 插件demo地址：http://yiminghe.me/zscroller/examples/demo.html
        let zscroller = new ZScroller(content, {
            scrollbars: false,
            scrollingX: false,
            snapping: true, // 滚动结束之后 滑动对应的位置
            penetrationDeceleration: .1,
            minVelocityToKeepDecelerating: 0.5,
            scrollingComplete () {
                // 滚动结束 回调
                console.log(11);
            }
        });

        // 设置每个格子的高度 这样滚动结束 自动滚到对应格子上
        zscroller.scroller.setSnapSize(0, 68);
    }
    render () {

        return (
            <div className="zby-picker-view-box">
                <div className="zby-picker-view-item">
                    <div className="zby-picker-view-list">
                        <div className="zby-picker-view-window"></div>
                        <div className="zby-picker-view-indicator"></div>
                        <div className="zby-picker-view-content" ref="content">
                            <div className="zby-picker-view-col selected">1</div>
                            <div className="zby-picker-view-col">2</div>
                            <div className="zby-picker-view-col">3</div>
                            <div className="zby-picker-view-col">4</div>
                            <div className="zby-picker-view-col">5</div>
                            <div className="zby-picker-view-col">6</div>
                            <div className="zby-picker-view-col">7</div>
                            <div className="zby-picker-view-col">8</div>
                            <div className="zby-picker-view-col">9</div>
                            <div className="zby-picker-view-col">10</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PickerView