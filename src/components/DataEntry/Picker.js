/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import PickerView from './PickerView'
import Touchable from 'rc-touchable'

// 选择器组件
class Picker extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined,
            show: false
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
    handleClick () {
        let {show} = this.props;

        this.setState({
            show: !show
        });
    }
    getPopupDOM () {
        const {show} = this.state;
        const pickerViewDOM = this.getPickerView();

        if(show){
            return <div>
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
            </div>
        }
    }
    getPickerView () {
        const {col, data, cascade} = this.props;
        const {defaultValue, show} = this.state;

        if(defaultValue != undefined && show){
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
        const popupDOM = this.getPopupDOM();

        return (
            <div className="zby-picker-box">
                {popupDOM}
                <Touchable
                    onPress={this.handleClick.bind(this)}>
                    {this.props.children}
                </Touchable>
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