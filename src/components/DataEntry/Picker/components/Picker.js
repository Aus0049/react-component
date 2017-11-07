/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import classNames from 'classnames'
import PickerView from 'components/DataEntry/PickerView/'
import Touchable from 'rc-touchable'
import '../style/picker.scss'

// 选择器组件
class Picker extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined, // 默认value
            selectedValue: undefined, // 选中value
            animation: 'out',
            show: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handlePickerViewChange = this.handlePickerViewChange.bind(this);
    }
    componentDidMount () {
        // picker 当做一个非受控组件
        const {value} = this.props;
        this.setState({
            defaultValue: value,
            selectedValue: value
        });
    }
    handleClickOpen (e) {
        if(e) e.preventDefault();

        this.setState({show: true});

        const t = this;
        // css动画
        const timer = setTimeout(()=>{
            t.setState({
                animation: 'in'
            });
            clearTimeout(timer);
        }, 0);
    }
    handleClickClose (e) {
        if(e) e.preventDefault();

        this.setState({animation: 'out'});

        const t = this;
        // css动画
        const timer = setTimeout(()=>{
            t.setState({
                show: false
            });
            clearTimeout(timer);
        }, 300);
    }
    handlePickerViewChange (newValue) {
        const {onPickerChange} = this.props;

        this.setState({selectedValue: newValue});

        if(onPickerChange){
            onPickerChange(newValue);
        }
    }
    handleCancel () {
        const {defaultValue} = this.state;
        const {onCancel} = this.props;

        this.handleClickClose();

        this.setState({selectedValue: defaultValue});

        onCancel();
    }
    handleConfirm () {
        // 点击确认之后的回调
        const {selectedValue} = this.state;
        const {onChange} = this.props;

        this.handleClickClose();

        this.setState({defaultChecked: selectedValue});

        onChange(selectedValue);
    }
    getPopupDOM () {
        const {show, animation} = this.state;
        const {prefixCls, cancelText, title, confirmText} = this.props;
        const pickerViewDOM = this.getPickerView();

        if(show){
            return (
                <div>
                    <Touchable onPress={this.handleCancel}>
                        <div className={classNames([`${prefixCls}-popup-mask`, {'hide': animation === 'out'}])} />
                    </Touchable>
                    <div className={classNames([`${prefixCls}-popup-wrap`, {'popup': animation === 'in'}])}>
                        <div className={`${prefixCls}-popup-header`}>
                            <Touchable onPress={this.handleCancel}>
                                <span className={`${prefixCls}-popup-item ${prefixCls}-header-left`}>{cancelText}</span>
                            </Touchable>
                            <span className={`${prefixCls}-popup-item ${prefixCls}-header-title`}>{title}</span>
                            <Touchable onPress={this.handleConfirm}>
                                <span className={`${prefixCls}-popup-item ${prefixCls}-header-right`}>{confirmText}</span>
                            </Touchable>
                        </div>
                        <div className={`${prefixCls}-popup-body`}>
                            {pickerViewDOM}
                        </div>
                    </div>
                </div>
            );
        }
    }
    getPickerView () {
        const {col, data, cascade} = this.props;
        const {selectedValue, show} = this.state;

        if(selectedValue !== undefined && show){
            return (
                <PickerView
                    col={col}
                    data={data}
                    value={selectedValue}
                    cascade={cascade}
                    onChange={this.handlePickerViewChange}
                />
            );
        }
    }
    render () {
        const {prefixCls} = this.props;
        const popupDOM = this.getPopupDOM();

        return (
            <div className={prefixCls}>
                {popupDOM}
                <Touchable onPress={this.handleClickOpen}>
                    {this.props.children}
                </Touchable>
            </div>
        )
    }
}

function empty() {}

Picker.propTypes = {
    col: React.PropTypes.number.isRequired, // 列数
    data: React.PropTypes.array.isRequired, // 数据源
    prefixCls: React.PropTypes.string, // 前缀class
    value: React.PropTypes.array, // 初始值
    title: React.PropTypes.string, // 题目文案
    cancelText: React.PropTypes.string, // 取消的文案
    confirmText: React.PropTypes.string, // 确认文案
    cascade: React.PropTypes.bool, // 是否级联
    onChange: React.PropTypes.func, // 值变化的时候的回调
    onCancel: React.PropTypes.func // 点击取消之后的回调
};

Picker.defaultProps = {
    prefixCls: 'zby-picker',
    col: 1,
    title: '',
    cancelText: '取消',
    confirmText: '确定',
    cascade: true,
    onChange: empty,
    onCancel: empty
};

export default Picker