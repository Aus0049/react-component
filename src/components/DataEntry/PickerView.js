/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'

// 选择器组件
class PickerView extends React.Component {
    render () {
        return (
            <div className="zby-picker-view-box">
                <div className="zby-picker-view-item">
                    <div className="zby-picker-view-list">
                        <div className="zby-picker-view-window"></div>
                        <div className="zby-picker-view-indicator"></div>
                        <div className="zby-picker-view-content">
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