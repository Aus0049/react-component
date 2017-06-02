/**
 * Created by Aus on 2017/6/2.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Picker from '../../components/DataEntry/Picker'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

class DatePickerPage extends React.Component {
    render () {

        return (
            <div className="page date-picker">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    DataPicker
                </h1>

                <ListTitle title="基本" />

                <List>

                </List>
            </div>
        )
    }
}

export default DatePickerPage