/**
 * Created by Aus on 2017/6/2.
 */
import React from 'react'
import classNames from 'classnames'
import PickerView from './PickerView'
import Touchable from 'rc-touchable'
import moment from 'moment'

const monthArray = [
    {label: "1月", value: "0"},{label: "2月", value: "1"},{label: "3月", value: "2"},{label: "4月", value: "3"},
    {label: "5月", value: "4"},{label: "6月", value: "5"},{label: "7月", value: "6"},{label: "8月", value: "7"},
    {label: "9月", value: "8"},{label: "10月", value: "9"},{label: "11月", value: "10"},{label: "12月", value: "11"}
];

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
    handlePickerViewChange (newValue) {
        // picker view回调的时候
        const {mode} = this.props;

        switch (mode) {
            case "date":
                // 检验新日期是否合法
                // 年月一定合法 主要就是检验日
                const newMaxDate = this.checkDaysByYearMonth(moment(newValue[0] + "-" + (newValue[1] + 1), "YYYY-MM"));

                if(newValue[3] > newMaxDate){
                    newValue[3] = newMaxDate + "";
                }

                let newMoment = moment([Number.parseInt(newValue[0]), Number.parseInt(newValue[1]), Number.parseInt(newValue[2])]);
                this.setState({
                    selectedValue: newMoment
                });
                break;
        }
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
    checkDaysByYearMonth (value) {
        const month = value.month();

        // 判断大小月
        if([0,2,4,6,7,9,11].indexOf(month) >= 0){
            // 大月 31天
            return 31;
        } else if ([3,5,8,10].indexOf(month) >= 0) {
            // 小月 30天
            return 30;
        } else {
            // 2月 判断是否闰年
            if(moment([value.year()]).isLeapYear()){
                // 闰年 29天
                return 29;
            }

            return 28;
        }
    }
    getDateByMode (mode) {
        let result = [];
        let todayMoment = moment();
        let {selectedValue} = this.state;

        switch (mode) {
            case "date":
                // 只有日期
                // 选取今年的前后5年
                let yearArray = [];
                let currentYear = Number.parseInt(todayMoment.format("YYYY"));

                for(let i = currentYear - 5; i < currentYear + 5; i++){
                    yearArray.push({label: i + "年", value: i + ''});
                }

                // 准备日 根据值判断当月有多少天
                const daysMax = this.checkDaysByYearMonth(selectedValue);

                let dayArray = [];
                for(let i = 1; i < daysMax + 1; i++){
                    dayArray.push({label: i + "日", value: i + ''});
                }

                result = [yearArray, monthArray, dayArray];
                break;
        }

        return result;
    }
    getPickerView () {
        // 根据mode不同 准备不同数据
        // date picker中的picker view 应该是不级联
        const {mode} = this.props;
        const {selectedValue, show} = this.state;

        if(selectedValue != undefined && show){
            const data = this.getDateByMode(mode);

            if(mode == "date"){
                return <PickerView
                    col={3}
                    data={data}
                    value={[selectedValue.year() + '', selectedValue.month() + '', selectedValue.date() + '']}
                    cascade={false}
                    onChange={this.handlePickerViewChange.bind(this)}>
                </PickerView>;
            }
        }
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