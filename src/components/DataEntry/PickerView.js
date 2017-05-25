/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'
import ZScroller from 'zscroller'
import PickerColumn from './PickerColumn'

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
    getColumns () {
        let result = [];
        let {col, data, value} = this.props;

        const dataArray = this.getDataArray(data, value);

        for(let i = 0; i < col; i++){
            result.push(<PickerColumn value={value} data={data} index={i}/>);
        }

        return result;
    }
    getDataArray (data, value) {
        // 根据data 和 value 解析出各个column需要的数组
        let result = [];

        return result;
    }
    render () {
        const columns = this.getColumns();

        return (
            <div className="zby-picker-view-box">
                {columns}
            </div>
        )
    }
}

export default PickerView