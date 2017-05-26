/**
 * Created by Aus on 2017/5/25.
 */
import React from 'react'
import ZScroller from 'zscroller'
import classNames from 'classnames'

// picker-view 中的列
class PickerColumn extends React.Component {
    componentDidMount () {
        // 绑定事件
        this.bindScrollEvent();
        // 列表滚到对应位置
    }
    bindScrollEvent () {
        // 绑定滚动的事件
        let content = this.refs.content;
        // getBoundingClientRect js原生方法
        const height = this.refs.indicator.getBoundingClientRect().height;

        // 最后还是用了何一鸣的zscroll插件
        // 但是这个插件并没有太多的文档介绍 gg
        // 插件demo地址：http://yiminghe.me/zscroller/examples/demo.html
        this.zscroller = new ZScroller(content, {
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
        // 单位必须是px 所以要动态取一下
        this.zscroller.scroller.setSnapSize(0, height);
    }
    getCols () {
        // 根据value 和 index 获取到对应的data
        let {data, value, index} = this.props;
        let result = [];

        for(let i = 0; i < data.length; i++){
            result.push(<div key={index + "-" + i} className={classNames(['zby-picker-view-col', {'selected': data[i].value == value}])}>{data[i].label}</div>);
        }

        return result;
    }
    render () {
        let cols = this.getCols();

        return (
            <div className="zby-picker-view-item">
                <div className="zby-picker-view-list">
                    <div className="zby-picker-view-window"></div>
                    <div className="zby-picker-view-indicator" ref="indicator"></div>
                    <div className="zby-picker-view-content" ref="content">
                        {cols}
                    </div>
                </div>
            </div>
        )
    }
}

export default PickerColumn;