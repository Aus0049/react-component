/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import PickerView from './PickerView'

// 选择器组件
class Picker extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined
        }
    }
    componentDidMount () {
        // picker 当做一个非受控组件
        let {value} = this.props;
        this.setState({
            defaultValue: value
        });
    }
    handleChange (newValue) {
        let {onChange} = this.props;

        this.setState({
            defaultSelectedValue: newValue
        });

        if(onChange){
            onChange(newValue);
        }
    }
    getPickerView () {
        const {col, data, cascade} = this.props;
        const {defaultValue} = this.state;

        if(defaultValue != undefined){
            return <PickerView
                col={col}
                data={data}
                value={defaultValue}
                cascade={cascade}
                onChange={this.handleChange.bind(this)}>
            </PickerView>;
        }
    }
    render () {
        const pickerViewDOM = this.getPickerView();

        return (
            <div className="zby-picker-box">
                <div className="zby-picker-popup-mask"></div>
                <div className="zby-picker-popup-wrap">
                    <div className="zby-picker-popup-header">
                        <span className="zby-picker-popup-item zby-header-left">
                            取消
                        </span>
                        <span className="zby-picker-popup-item zby-header-title">
                            选择地区
                        </span>
                        <span className="zby-picker-popup-item zby-header-right">
                            确认
                        </span>
                    </div>
                    <div className="zby-picker-popup-body">
                        {pickerViewDOM}
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

Picker.propTypes = {
    col: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.array,
    cascade: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

Picker.defaultProps = {
    col: 1,
    cascade: true
};

export default Picker