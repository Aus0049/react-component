/**
 * Created by Aus on 2017/5/25.
 */
import React from 'react'

// picker-view 中的列
class PickerColumn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: undefined
        }
    }
    componentDidMount () {
        // 初次加载时候 不受控组件 存入初始值
        this.setState({
            value: this.props.value
        });
        // 列表滚到对应位置
    }
    getCols () {
        // 根据value 和 index 获取到对应的data
        let {data, value, index} = this.props;
        let result = [];

        const dataArray = this.getDataArray(data, value);

        return result;
    }
    getDataArray () {

    }
    render () {
        let cols = this.getCols();

        return (
            <div className="zby-picker-view-item">
                <div className="zby-picker-view-list">
                    <div className="zby-picker-view-window"></div>
                    <div className="zby-picker-view-indicator"></div>
                    <div className="zby-picker-view-content" ref="content">
                        {cols}
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
        )
    }
}

export default PickerColumn;