/**
 * Created by Aus on 2017/11/7.
 */
import moment from 'moment'

// 公共 函数和数据
export const monthArray = [
    {label: '1月', value: '0'},{label: '2月', value: '1'},{label: '3月', value: '2'},{label: '4月', value: '3'},
    {label: '5月', value: '4'},{label: '6月', value: '5'},{label: '7月', value: '6'},{label: '8月', value: '7'},
    {label: '9月', value: '8'},{label: '10月', value: '9'},{label: '11月', value: '10'},{label: '12月', value: '11'}
];

export const hourArray = [
    {label: '0点', value: '0'},{label: '1点', value: '1'},{label: '2点', value: '2'},{label: '3点', value: '3'},
    {label: '4点', value: '4'},{label: '5点', value: '5'},{label: '6点', value: '6'},{label: '7点', value: '7'},
    {label: '8点', value: '8'},{label: '9点', value: '9'},{label: '10点', value: '10'},{label: '11点', value: '11'},
    {label: '12点', value: '12'},{label: '13点', value: '13'},{label: '14点', value: '14'},{label: '15点', value: '15'},
    {label: '16点', value: '16'},{label: '17点', value: '17'},{label: '18点', value: '18'},{label: '19点', value: '19'},
    {label: '20点', value: '20'},{label: '21点', value: '21'},{label: '22点', value: '22'},{label: '23点', value: '23'}
];

export const checkDaysByYearMonth = (value) => {
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
};

export const resetPosition = (array, newValue, index) => {
    // 如果比最后一个值大 去最后一个 否则 取第一个
    // 取第一个
    if(Number.parseInt(newValue[index]) > Number.parseInt(array[array.length - 1].value)){
        newValue[index] = array[array.length - 1].value;
    } else {
        newValue[index] = array[0].value;
    }

    return newValue;
};