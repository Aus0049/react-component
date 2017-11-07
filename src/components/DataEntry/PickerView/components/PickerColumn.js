/**
 * Created by Aus on 2017/5/25.
 */
import React from 'react'
import ZScroller from 'zscroller'
import classNames from 'classnames'
import '../style/picker-column.scss'

// picker-view 中的列
class PickerColumn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        // getBoundingClientRect js原生方法
        // 根据变量判断dom是否渲染完毕
        this.itemHeight = this.refs.indicator.getBoundingClientRect().height;
        if(this.itemHeight !== 0){
            // 绑定事件
            this.bindScrollEvent();
            // 列表滚到对应位置
            this.scrollToPosition();
            return;
        }
        // TODO 这里有个问题 必须要等到渲染结束才能绑定事件 不然获取元素高度有bug 待优化
        window.setTimeout(()=>{
            // 绑定事件
            this.bindScrollEvent();
            // 列表滚到对应位置
            this.scrollToPosition();
        }, 100);
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
        const t = this;
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

        if(selectedValue && selectedValue !== value){
            // 值发生变化 通知父组件
            onValueChange(selectedValue, index);
        }
    }
    scrollToPosition () {
        // 滚动到选中的位置
        const {data, value} = this.props;

        for(let i = 0; i < data.length; i++){
            if(data[i].value === value){
                this.selectByIndex(i);
                return;
            }
        }

        this.selectByIndex(0);
    }
    selectByIndex (index) {
        // 滚动到index对应的位置
        const top = this.itemHeight * index;

        this.zscroller.scroller.scrollTo(0, top);
    }
    getCols () {
        // 根据value 和 index 获取到对应的data
        const {data, value, index, prefixCls} = this.props;

        return data.map((item, i)=>(<div key={index + '-' + i} className={classNames([`${prefixCls}-col`, {'selected': data[i].value === value}])}>{data[i].label}</div>));
    }
    render () {
        const {prefixCls} = this.props;
        const cols = this.getCols();

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-list`}>
                    <div className={`${prefixCls}-window`} />
                    <div className={`${prefixCls}-indicator`} ref='indicator' />
                    <div className={`${prefixCls}-content`} ref='content'>
                        {cols}
                    </div>
                </div>
            </div>
        )
    }
}

function empty() {}

PickerColumn.propTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    index: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    value: React.PropTypes.string,
    onValueChange: React.PropTypes.func
};

PickerColumn.defaultProps = {
    prefixCls: 'zby-picker-column',
    value: '',
    onValueChange: empty
};

export default PickerColumn;