/**
 * Created by Aus on 2017/6/2.
 */
import React from 'react'
import classNames from 'classnames'
import PickerView from './PickerView'
import Touchable from 'rc-touchable'
import moment from 'moment'

// 日期时间选择器
class DatePicker extends React.Component {
    static defaultProps = {
        mode: "date",
        value: moment()
    };
    static propTypes = {
        mode: React.PropTypes.string, // 模式：枚举类型：日期date 时间time 日期时间datetime 年year 月moth 默认是date
        value: React.PropTypes.object, // moment类型
        title: React.PropTypes.string, // 标题
    };
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined,
            selectedValue: undefined,
            animation: "out",
            show: false
        }
    }
    componentDidMount () {
        // picker 当做一个非受控组件
        let {value} = this.props;
        this.setState({
            defaultValue: value,
            selectedValue: value
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
    handleCancel () {
        const {defaultValue} = this.state;
        const {onCancel} = this.props;

        this.handleClickClose();

        this.setState({
            selectedValue: defaultValue
        });

        if(onCancel){
            onCancel();
        }
    }
    handleConfirm () {
        // 点击确认之后的回调
        const {defaultValue} = this.state;

        this.handleClickClose();

        if (this.props.onChange) this.props.onChange(defaultValue);
    }
    getDateByMode (mode) {
        let result = [];
        let todayMoment = moment();

        switch (mode) {
            case "date":
                // 只有日期
                // 选取今年的前后5年
                let yearArray = [];
                let currentYear = Number.parseInt(todayMoment.format("YYYY"));

                for(let i = currentYear - 5; i < currentYear + 5; i++){
                    yearArray.push({label: i + "年", value: i});
                }
                console.log(yearArray);

                break;
        }

        return result;
    }
    getPickerView () {
        // 根据mode不同 准备不同数据
        // date picker中的picker view 应该是不级联
        const {mode} = this.props;

        const data = this.getDateByMode(mode);
    }
    getPopupDOM () {
        const {show, animation} = this.state;
        const {title} = this.props;
        const pickerViewDOM = this.getPickerView();

        if(show){
            return <div>
                <Touchable
                    onPress={this.handleCancel.bind(this)}>
                    <div className={classNames(['zby-picker-popup-mask', {'hide': animation == "out"}])}></div>
                </Touchable>
                <div className={classNames(['zby-picker-popup-wrap', {'popup': animation == "in"}])}>
                    <div className="zby-picker-popup-header">
                        <Touchable
                            onPress={this.handleCancel.bind(this)}>
                            <span className="zby-picker-popup-item zby-header-left">取消</span>
                        </Touchable>
                        <span className="zby-picker-popup-item zby-header-title">{title}</span>
                        <Touchable
                            onPress={this.handleConfirm.bind(this)}>
                            <span className="zby-picker-popup-item zby-header-right">确定</span>
                        </Touchable>
                    </div>
                    <div className="zby-picker-popup-body">
                        {pickerViewDOM}
                    </div>
                </div>
            </div>
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

export default DatePicker