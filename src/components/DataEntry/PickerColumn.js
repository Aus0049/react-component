/**
 * Created by Aus on 2017/5/25.
 */
import React from 'react'
import ZScroller from 'zscroller'
import classNames from 'classnames'

// picker-view 中的列
class PickerColumn extends React.Component {
    static propTypes = {
        index: React.PropTypes.number,
        data: React.PropTypes.array,
        value: React.PropTypes.string,
        onValueChange: React.PropTypes.func
    };
    componentDidMount () {
        // 绑定事件
        this.bindScrollEvent();
        // 列表滚到对应位置
        this.scrollToPosition();
    }
    componentDidUpdate() {
        this.zscroller.reflow();
        this.scrollToPosition();
    }
    componentWillUnmount() {
        this.zscroller.destroy();
    }
    bindScrollEvent () {
        // 绑定滚动的事件
        const content = this.refs.content;
        // getBoundingClientRect js原生方法
        this.itemHeight = this.refs.indicator.getBoundingClientRect().height;

        // 最后还是用了何一鸣的zscroll插件
        // 但是这个插件并没有太多的文档介绍 gg
        // 插件demo地址：http://yiminghe.me/zscroller/examples/demo.html
        let t = this;
        this.zscroller = new ZScroller(content, {
            scrollbars: false,
            scrollingX: false,
            snapping: true, // 滚动结束之后 滑动对应的位置
            penetrationDeceleration: .1,
            minVelocityToKeepDecelerating: 0.5,
            scrollingComplete () {
                // 滚动结束 回调
                t.scrollingComplete();
            }
        });

        // 设置每个格子的高度 这样滚动结束 自动滚到对应格子上
        // 单位必须是px 所以要动态取一下
        this.zscroller.scroller.setSnapSize(0, this.itemHeight);
    }
    scrollingComplete () {
        // 滚动结束 判断当前选中值
        const { top } = this.zscroller.scroller.getValues();
        const {data, value, index, onValueChange} = this.props;

        let currentIndex = top / this.itemHeight;
        const floor = Math.floor(currentIndex);
        if (currentIndex - floor > 0.5) {
            currentIndex = floor + 1;
        } else {
            currentIndex = floor;
        }

        let selectedValue;

        if(data[currentIndex]) {
            selectedValue = data[currentIndex].value;
        }

        if(selectedValue && selectedValue != value){
            // 值发生变化 通知父组件
            onValueChange(selectedValue, index);
        }
    }
    scrollToPosition () {
        // 滚动到选中的位置
        let {data, value} = this.props;

        data.map((item)=>{
            if(item.value == value){
                this.selectByIndex();
                return;
            }
        });

        for(let i = 0; i < data.length; i++){
            if(data[i].value == value){
                this.selectByIndex(i);
                return;
            }
        }

        this.selectByIndex(0);
    }
    selectByIndex (index) {
        // 滚动到index对应的位置
        let top = this.itemHeight * index;

        this.zscroller.scroller.scrollTo(0, top);
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