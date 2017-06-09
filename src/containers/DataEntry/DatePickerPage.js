/**
 * Created by Aus on 2017/6/2.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import DatePicker from '../../components/DataEntry/DatePicker'
import Tools from '../../components/Tools/Tools'
import moment from 'moment'

const Item = List.Item;

class DatePickerPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dateValue: moment(),
            timeValue: moment("12:10", "HH:mm"),
            datetimeValue: moment(),
            yearValue: moment(),
            monthValue: moment()
        }
    }
    handleChange (type, newValue) {
        console.log("value change");
        console.log(newValue);
        if(type == "date"){
            this.setState({
                dateValue: newValue
            });
        } else if(type == "time") {
            this.setState({
                timeValue: newValue
            });
        } else if (type == "datetime") {
            this.setState({
                datetimeValue: newValue
            });
        } else if (type == "year") {
            this.setState({
                yearValue: newValue
            });
        } else if (type == "month") {
            this.setState({
                monthValue: newValue
            });
        }
    }
    render () {
        const {dateValue, timeValue, datetimeValue, yearValue, monthValue} = this.state;

        return (
            <div className="page date-picker">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    DataPicker
                </h1>

                <ListTitle title="基本" />

                <List>
                    <DatePicker
                        mode="date"
                        value={dateValue}
                        title="选择日期"
                        maxValue={moment("2018-06-21", "YYYY-MM-DD")}
                        minValue={moment("2015-09-02", "YYYY-MM-DD")}
                        onChange={this.handleChange.bind(this, "date")}>
                        <Item subtitle={dateValue.format('YYYY-MM-DD')} icon="horizontal">日期选择</Item>
                    </DatePicker>
                    <DatePicker
                        mode="time"
                        value={timeValue}
                        title="选择时间"
                        timeStep={10}
                        maxValue={moment("14:30", "HH:mm")}
                        minValue={moment("10:10", "HH:mm")}
                        onChange={this.handleChange.bind(this, "time")}>
                        <Item subtitle={timeValue.format('HH:mm')} icon="horizontal">时间选择</Item>
                    </DatePicker>
                    <DatePicker
                        mode="datetime"
                        value={datetimeValue}
                        title="选择日期时间"
                        maxValue={moment("2018-12-02 14:30", "YYYY-MM-DD HH:mm")}
                        minValue={moment("2016-01-31 10:10", "YYYY-MM-DD HH:mm")}
                        onChange={this.handleChange.bind(this, "datetime")}>
                        <Item subtitle={datetimeValue.format('YYYY-MM-DD HH:mm')} icon="horizontal">日期时间选择</Item>
                    </DatePicker>
                    <DatePicker
                        mode="year"
                        value={yearValue}
                        title="选择年份"
                        maxValue={moment([2030])}
                        minValue={moment([2015])}
                        onChange={this.handleChange.bind(this, "year")}>
                        <Item subtitle={yearValue.format('YYYY')} icon="horizontal">年份选择</Item>
                    </DatePicker>
                    <DatePicker
                        mode="month"
                        value={monthValue}
                        title="选择月份"
                        maxValue={moment("11", "MM")}
                        minValue={moment("5", "MM")}
                        onChange={this.handleChange.bind(this, "month")}>
                        <Item subtitle={monthValue.format('MM')} icon="horizontal">月份选择</Item>
                    </DatePicker>
                </List>
            </div>
        )
    }
}

export default DatePickerPage