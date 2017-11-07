/**
 * Created by Aus on 2017/6/2.
 */
import React from 'react'
import classNames from 'classnames'
import PickerView from 'components/DataEntry/PickerView/'
import {
    monthArray,
    hourArray,
    checkDaysByYearMonth,
    resetPosition
} from '../util/'
import Touchable from 'rc-touchable'
import moment from 'moment'
import '../style/datePicker.scss'


// 日期时间选择器
class DatePicker extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined,
            selectedValue: undefined,
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
    handlePickerViewChange (newValue) {
        // picker view回调的时候
        const {mode} = this.props;

        switch (mode) {
            case 'date':
                // 检验新日期是否合法
                // 年月一定合法 主要就是检验日
                newValue = this.checkNewValue(newValue, ['date']);

                const newDateMoment = moment([Number.parseInt(newValue[0]), Number.parseInt(newValue[1]), Number.parseInt(newValue[2])]);
                this.setState({selectedValue: newDateMoment});

                break;
            case 'time':
                // 时间切换
                newValue = this.checkNewValue(newValue, ['time']);

                const newTimeMoment = moment(`${newValue[0]}:${newValue[1]}`, 'HH:mm');
                this.setState({selectedValue: newTimeMoment});

                break;
            case 'datetime':

                newValue = this.checkNewValue(newValue, ['date', 'time']);

                const newDateTimeMoment = moment([Number.parseInt(newValue[0]), Number.parseInt(newValue[1]), Number.parseInt(newValue[2]), Number.parseInt(newValue[3]), Number.parseInt(newValue[4])]);
                this.setState({selectedValue: newDateTimeMoment});

                break;
            case 'year':
                this.setState({selectedValue: moment(newValue)});

                break;
            case 'month':
                this.setState({selectedValue: moment(Number.parseInt(newValue[0]) + 1, 'MM')});

                break;
        }
    }
    handleClickOpen (e) {

        if(e) e.preventDefault();

        this.setState({show: true});

        const t = this;
        let timer = setTimeout(()=>{
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

        this.setState({selectedValue: defaultValue});

        if (onCancel) onCancel();
    }
    handleConfirm () {
        // 点击确认之后的回调
        const {selectedValue} = this.state;

        this.handleClickClose();

        // 更新默认值
        this.setState({defaultValue: selectedValue});

        if (this.props.onChange) this.props.onChange(selectedValue);
    }
    checkNewValue (newValue, mode) {
        // 检查新的值是否合法
        if(!moment(newValue).isValid()){
            // 判断哪个字段不合法
            const wrongPosition = moment(newValue).invalidAt();
            if(wrongPosition == 2) {
                const array = this.getDateArray(newValue.slice(0,2));
                if(Number.parseInt(newValue[2]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[2]) > Number.parseInt(array[array.length - 1].value)){
                    newValue = resetPosition(array, newValue, 2);
                }
            }
        }
        // 逐项检查新日期各项 是否在限制条件内
        // 从月份开始检查
        const {maxValue, minValue} = this.props;

        if(mode.indexOf('date') >= 0){
            if(minValue){
                if(Number.parseInt(newValue[0]) == minValue.year()){
                    const array = this.getMonthArray(newValue.slice(0,1));
                    if(Number.parseInt(newValue[1]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[1]) > Number.parseInt(array[array.length - 1].value)){
                        newValue = resetPosition(array, newValue, 1);
                    }
                }

                if(Number.parseInt(newValue[0]) == minValue.year() && Number.parseInt(newValue[1]) == minValue.month()){
                    const array = this.getDateArray(newValue.slice(0,2));
                    if(Number.parseInt(newValue[2]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[2]) > Number.parseInt(array[array.length - 1].value)){
                        newValue = resetPosition(array, newValue, 2);
                    }
                }

                if(mode.indexOf('time') >= 0){
                    if(Number.parseInt(newValue[0]) == minValue.year() && Number.parseInt(newValue[1]) == minValue.month() && Number.parseInt(newValue[2]) == minValue.date()){
                        const array = this.getHourArray(newValue.slice(0,3), true);
                        if(Number.parseInt(newValue[3]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[3]) > Number.parseInt(array[array.length - 1].value)){
                            newValue = resetPosition(array, newValue, 3);
                        }
                    }

                    if(Number.parseInt(newValue[0]) == minValue.year() && Number.parseInt(newValue[1]) == minValue.month() && Number.parseInt(newValue[2]) == minValue.date() && Number.parseInt(newValue[3]) == minValue.hour()){
                        const array = this.getMinuteArray(newValue.slice(0,4), true);
                        if(Number.parseInt(newValue[4]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[4]) > Number.parseInt(array[array.length - 1].value)){
                            newValue = resetPosition(array, newValue, 4);
                        }
                    }
                }
            }

            if(maxValue){
                if(Number.parseInt(newValue[0]) == maxValue.year()){
                    const array = this.getMonthArray(newValue.slice(0,1));
                    if(Number.parseInt(newValue[1]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[1]) > Number.parseInt(array[array.length - 1].value)){
                        newValue = resetPosition(array, newValue, 1);
                    }
                }

                if(Number.parseInt(newValue[0]) == maxValue.year() && Number.parseInt(newValue[1]) == maxValue.month()){
                    const array = this.getDateArray(newValue.slice(0,2));
                    if(Number.parseInt(newValue[2]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[2]) > Number.parseInt(array[array.length - 1].value)){
                        newValue = resetPosition(array, newValue, 2);
                    }
                }

                if(mode.indexOf('time') >= 0){
                    if(Number.parseInt(newValue[0]) == maxValue.year() && Number.parseInt(newValue[1]) == maxValue.month() && Number.parseInt(newValue[2]) == maxValue.date()){
                        const array = this.getHourArray(newValue.slice(0,3), true);
                        if(Number.parseInt(newValue[3]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[3]) > Number.parseInt(array[array.length - 1].value)){
                            newValue = resetPosition(array, newValue, 3);
                        }
                    }

                    if(Number.parseInt(newValue[0]) == maxValue.year() && Number.parseInt(newValue[1]) == maxValue.month() && Number.parseInt(newValue[2]) == maxValue.date() && Number.parseInt(newValue[3]) == maxValue.hour()){
                        const array = this.getMinuteArray(newValue.slice(0,4), true);
                        if(Number.parseInt(newValue[4]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[4]) > Number.parseInt(array[array.length - 1].value)){
                            newValue = resetPosition(array, newValue, 4);
                        }
                    }
                }

            }
        }

        if(mode.indexOf('time') >= 0){
            // 验证分钟就行
            if(minValue){
                if(Number.parseInt(newValue[0]) == minValue.hour()){
                    const array = this.getMinuteArray(newValue[0]);
                    if(Number.parseInt(newValue[1]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[1]) > Number.parseInt(array[array.length - 1].value)){
                        newValue = resetPosition(array, newValue, 1);
                    }
                }
            }

            if(maxValue){
                if(Number.parseInt(newValue[0]) == maxValue.hour()){
                    const array = this.getMinuteArray(newValue[0]);
                    if(Number.parseInt(newValue[1]) < Number.parseInt(array[0].value) || Number.parseInt(newValue[1]) > Number.parseInt(array[array.length - 1].value)){
                        newValue = resetPosition(array, newValue, 1);
                    }
                }
            }
        }

        return newValue;
    }
    getYearArray () {
        // 获取年数组
        const {selectedValue} = this.state;
        const {maxValue, minValue} = this.props;

        const yearArray = [];
        let currentYear = selectedValue.year();

        // 默认显示选中值前后五年
        // 有最大最小值 根据最大最小值显示
        let earliest = minValue ? minValue.year() : currentYear - 5;
        let latest = maxValue ? maxValue.year() : currentYear + 5;

        for(let i = earliest; i <= latest; i++){
            yearArray.push({label: i + '年', value: i + ''});
        }

        return yearArray;
    }
    getMonthArray (newValue) {
        let result = monthArray.concat();
        let {selectedValue} = this.state;
        const {maxValue, minValue} = this.props;

        if(newValue){
            selectedValue = moment(newValue);
        }

        if(minValue){
            if(selectedValue.year() === minValue.year()) {
                result = result.filter((item) => {
                    if(minValue.month() <= Number.parseInt(item.value)) return true;
                });
            }
        }

        if(maxValue){
            if(selectedValue.year() === maxValue.year()){
                result = result.filter((item) => {
                    if(maxValue.month() >= Number.parseInt(item.value)) return true;
                });
            }
        }

        return result;
    }
    getDateArray (newValue) {
        let dayArray = [];
        let {selectedValue} = this.state;
        const {maxValue, minValue} = this.props;

        if(newValue){
            selectedValue = moment(newValue);
        }

        const daysMax = checkDaysByYearMonth(selectedValue);

        // 先生成一个数组
        for(let i = 1; i < daysMax + 1; i++){
            dayArray.push({label: i + '日', value: i + ''});
        }

        // 根据大小值过滤
        if(minValue){
            if(selectedValue.year() == minValue.year() && selectedValue.month() == minValue.month()){
                dayArray = dayArray.filter((item)=>{
                    return Number.parseInt(item.value) >= minValue.date();
                })
            }
        }

        if(maxValue){
            if(selectedValue.year() == maxValue.year() && selectedValue.month() == maxValue.month()){
                dayArray = dayArray.filter((item)=>{
                    return Number.parseInt(item.value) <= maxValue.date();
                })
            }
        }

        return dayArray;
    }
    getHourArray (newValue, connectDate) {
        let result = hourArray.concat();
        let {selectedValue} = this.state;
        const {maxValue, minValue} = this.props;

        if(newValue){
            selectedValue = moment(newValue);
        }

        if(connectDate) {
            if(minValue){
                if(selectedValue.year() == minValue.year() && selectedValue.month() == minValue.month() && selectedValue.date() == minValue.date()){
                    result = result.filter((item) => {
                        return Number.parseInt(item.value) >= minValue.hour();
                    });
                }
            }

            if(maxValue){
                if(selectedValue.year() == maxValue.year() && selectedValue.month() == maxValue.month() && selectedValue.date() == maxValue.date()){
                    result = result.filter((item) => {
                        return maxValue.hour() >= Number.parseInt(item.value);
                    });
                }
            }

        } else {
            if(minValue){
                result = result.filter((item) => {
                    return Number.parseInt(item.value) >= minValue.hour();
                });
            }

            if(maxValue){
                result = result.filter((item) => {
                    return maxValue.hour() >= Number.parseInt(item.value);
                });
            }
        }

        return result;
    }
    getMinuteArray (newValue, connectDate) {
        let result = [];
        let {selectedValue} = this.state;
        const {maxValue, minValue} = this.props;
        const {timeStep} = this.props;
        const length = 60 / timeStep;

        if(newValue){
            if(newValue.length == 4){
                selectedValue = moment(newValue);
            } else {
                selectedValue = moment(newValue, 'HH');
            }
        }

        for(let i = 0; i < length; i++){
            result.push({label: timeStep * i + '分', value: timeStep * i + ''});
        }

        if(connectDate){
            if(minValue){
                if(selectedValue.year() == minValue.year() && selectedValue.month() == minValue.month() && selectedValue.date() == minValue.date() && selectedValue.hour() == minValue.hour()){
                    result = result.filter((item)=>{
                        return Number.parseInt(item.value) >= minValue.minute();
                    });
                }
            }

            if(maxValue) {
                if(selectedValue.year() == maxValue.year() && selectedValue.month() == maxValue.month() && selectedValue.date() == maxValue.date() && selectedValue.hour() == maxValue.hour()){
                    result = result.filter((item)=>{
                        return Number.parseInt(item.value) <= maxValue.minute();
                    });
                }
            }
        } else {
            if(minValue){
                if(selectedValue.hour() == minValue.hour()){
                    result = result.filter((item)=>{
                        return Number.parseInt(item.value) >= minValue.minute();
                    });
                }
            }

            if(maxValue) {
                if(selectedValue.hour() == maxValue.hour()){
                    result = result.filter((item)=>{
                        return Number.parseInt(item.value) <= maxValue.minute();
                    });
                }
            }
        }

        return result;
    }
    getDateByMode (mode) {
        let result = [];

        switch (mode) {
            case 'date': {
                // 只有日期
                // 选取今年的前后5年
                const yearArray = this.getYearArray();

                // 判断月 只有年在限制的时候 才限制月
                const monthArray = this.getMonthArray();

                // 准备日 根据值判断当月有多少天
                const dateArray = this.getDateArray();

                result = [yearArray, monthArray, dateArray];
                break;
            }
            case 'time': {
                const hourArray = this.getHourArray();

                const minuteArray = this.getMinuteArray();

                result = [hourArray, minuteArray];
                break;
            }
            case 'datetime': {
                // 时间日期选择器
                const yearArray = this.getYearArray();

                const monthArray = this.getMonthArray();

                const dateArray = this.getDateArray();

                const hourArray = this.getHourArray(undefined, true);

                const minuteArray = this.getMinuteArray(undefined, true);

                result = [yearArray, monthArray, dateArray, hourArray, minuteArray];
                break;
            }
            case 'year': {
                // 年份选择器
                const yearArray = this.getYearArray();

                result = [yearArray];
                break;
            }
            case 'month': {
                // 月份选择
                const monthArray = this.getMonthArray();

                result = [monthArray];
            }
                break;
            default: {
                break;
            }
        }

        return result;
    }
    getPickerView () {
        // 根据mode不同 准备不同数据
        // date picker中的picker view 应该是不级联
        const {mode} = this.props;
        const {selectedValue, show} = this.state;
        const result = [];

        if(selectedValue !== undefined && show){
            const data = this.getDateByMode(mode);

            switch (mode) {
                case 'date': {
                    result.push(
                        <PickerView
                            key={mode}
                            col={3}
                            data={data}
                            value={[selectedValue.year() + '', selectedValue.month() + '', selectedValue.date() + '']}
                            cascade={false}
                            controlled
                            onChange={this.handlePickerViewChange}
                        />
                    );
                    break;
                }
                case 'time': {
                    result.push(
                        <PickerView
                            key={mode}
                            col={2}
                            data={data}
                            value={[selectedValue.hour() + '', selectedValue.minute() + '']}
                            cascade={false}
                            controlled
                            onChange={this.handlePickerViewChange}
                        />
                    );
                    break;
                }
                case 'datetime': {
                    result.push(
                        <PickerView
                            key={mode}
                            col={5}
                            data={data}
                            value={[selectedValue.year() + '', selectedValue.month() + '', selectedValue.date() + '', selectedValue.hour() + '', selectedValue.minute() + '']}
                            cascade={false}
                            controlled
                            onChange={this.handlePickerViewChange}
                        />
                    );
                    break;
                }
                case 'year': {
                    result.push(
                        <PickerView
                            key={mode}
                            col={1}
                            data={data}
                            value={[selectedValue.year() + '']}
                            cascade={false}
                            controlled
                            onChange={this.handlePickerViewChange}
                        />
                    );
                    break;
                }
                case 'month': {
                    result.push(
                        <PickerView
                            key={mode}
                            col={1}
                            data={data}
                            value={[selectedValue.month() + '']}
                            cascade={false}
                            controlled
                            onChange={this.handlePickerViewChange}
                        />
                    );
                    break;
                }
                default: {
                    break;
                }
            }
        }

        return result;
    }
    getPopupDOM () {
        const {show, animation} = this.state;
        const {prefixCls, title, cancelText, confirmText} = this.props;
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


DatePicker.propTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    mode: React.PropTypes.oneOf(['date', 'time', 'datetime', 'year', 'month']), // 模式：枚举类型：日期date 时间time 日期时间datetime 年year 月month 默认是date
    value: React.PropTypes.object, // moment类型
    title: React.PropTypes.string, // 标题
    cancelText: React.PropTypes.string, // 取消的文案
    confirmText: React.PropTypes.string, // 确认文案
    timeStep: React.PropTypes.number, // time模式下 时间的步长 值为60的约数如1，2，3，4，5，6，10，12，15，20，30，60
    maxValue: React.PropTypes.object, // 最大值 <=
    minValue: React.PropTypes.object // 最小值 >=
};

DatePicker.defaultProps = {
    prefixCls: 'zby-picker',
    mode: 'date',
    value: moment(),
    cancelText: '取消',
    confirmText: '确定',
    timeStep: 1
};

export default DatePicker