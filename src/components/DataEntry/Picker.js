/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import classNames from 'classnames'
import PickerView from './PickerView'
import Touchable from 'rc-touchable'

// 选择器组件
class Picker extends React.Component {
    static defaultProps = {
        col: 1,
        cancelText: "取消",
        confirmText: "确定",
        cascade: true
    };
    static propTypes = {
        col: React.PropTypes.number,
        data: React.PropTypes.array,
        value: React.PropTypes.array,
        cancelText: React.PropTypes.string,
        title: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        cascade: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined,
            animation: "out",
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
    handleClickOpen (e) {

        if(e) e.preventDefault();

        this.setState({
            show: true
        });

        let t = this;
        let timer = setTimeout(()=>{
            t.setState({
                animation: "in"
            });
            clearTimeout(timer);
        }, 0);
    }
    handleClickClose (e) {

        if(e) e.preventDefault();

        this.setState({
            animation: "out"
        });

        let t = this;
        let timer = setTimeout(()=>{
            t.setState({
                show: false
            });
            clearTimeout(timer);
        }, 300);
    }
    handlePickerViewChange (newValue) {
        let {onPickerChange} = this.props;

        this.setState({
            defaultValue: newValue
        });

        if(onPickerChange){
            onPickerChange(newValue);
        }
    }
    handleConfirm () {
        // 点击确认之后的回调
        const {defaultValue} = this.state;

        this.handleClickClose();

        if (this.props.onChange) this.props.onChange(defaultValue);
    }
    getPopupDOM () {
        const {show, animation} = this.state;
        const {cancelText, title, confirmText} = this.props;
        const pickerViewDOM = this.getPickerView();

        if(show){
            return <div>
                <Touchable
                    onPress={this.handleClickClose.bind(this)}>
                    <div className={classNames(['zby-picker-popup-mask', {'hide': animation == "out"}])}></div>
                </Touchable>
                <div className={classNames(['zby-picker-popup-wrap', {'popup': animation == "in"}])}>
                    <div className="zby-picker-popup-header">
                        <Touchable
                            onPress={this.handleClickClose.bind(this)}>
                            <span className="zby-picker-popup-item zby-header-left">{cancelText}</span>
                        </Touchable>
                        <span className="zby-picker-popup-item zby-header-title">{title}</span>
                        <Touchable
                            onPress={this.handleConfirm.bind(this)}>
                            <span className="zby-picker-popup-item zby-header-right">{confirmText}</span>
                        </Touchable>
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
                onChange={this.handlePickerViewChange.bind(this)}>
            </PickerView>;
        }
    }
    render () {
        const popupDOM = this.getPopupDOM();

        return (
            <div className="zby-picker-box">
                {popupDOM}
                <Touchable
                    onPress={this.handleClickOpen.bind(this)}>
                    {this.props.children}
                </Touchable>
            </div>
        )
    }
}

export default Picker